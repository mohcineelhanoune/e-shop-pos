const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const Order = require('../models/Order');

// Company information - À personnaliser
const COMPANY_INFO = {
  name: 'E-Commerce Store',
  address: '123 Rue du Commerce',
  city: '75001 Paris, France',
  phone: '+33 1 23 45 67 89',
  email: 'contact@ecommerce-store.fr',
  website: 'www.ecommerce-store.fr',
  siret: '12345678901234',
  tva: 'FR12345678901'
};

// @desc      Generate PDF invoice for an order
// @route     GET /api/invoices/:orderId
// @access    Private/Admin
const generateInvoice = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('orderItems.product', 'name');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Create PDF document
    const doc = new PDFDocument({ margin: 50 });

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="facture-${order.orderNumber}.pdf"`);

    // Pipe PDF to response
    doc.pipe(res);

    // Generate PDF content
    generateHeader(doc);
    generateCustomerInformation(doc, order);
    generateInvoiceTable(doc, order);
    generateFooter(doc);

    // Finalize PDF
    doc.end();

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

function generateHeader(doc) {
  doc
    .fillColor('#444444')
    .fontSize(20)
    .text(COMPANY_INFO.name, 50, 45)
    .fontSize(10)
    .text(COMPANY_INFO.address, 50, 70)
    .text(COMPANY_INFO.city, 50, 85)
    .text(`Tél: ${COMPANY_INFO.phone}`, 50, 100)
    .text(`Email: ${COMPANY_INFO.email}`, 50, 115)
    .text(`SIRET: ${COMPANY_INFO.siret}`, 50, 130)
    .text(`TVA: ${COMPANY_INFO.tva}`, 50, 145)
    .moveDown();
}

function generateCustomerInformation(doc, order) {
  const customerInformationTop = 200;

  doc
    .fillColor('#444444')
    .fontSize(20)
    .text('FACTURE', 50, customerInformationTop)
    .fontSize(10)
    .text(`Numéro: ${order.orderNumber}`, 50, customerInformationTop + 30)
    .text(`Date: ${formatDate(order.createdAt)}`, 50, customerInformationTop + 45)
    .text(`Statut: ${getStatusLabel(order.status)}`, 50, customerInformationTop + 60)
    .text(`Type: ${getTypeLabel(order.orderType)}`, 50, customerInformationTop + 75)

    .fontSize(10)
    .text('Facturé à:', 300, customerInformationTop)
    .font('Helvetica-Bold')
    .text(order.customer.name, 300, customerInformationTop + 15)
    .font('Helvetica')
    .text(order.customer.phone, 300, customerInformationTop + 30);

  if (order.customer.email) {
    doc.text(order.customer.email, 300, customerInformationTop + 45);
  }

  if (order.customer.address && order.customer.address.street) {
    doc.text(order.customer.address.street, 300, customerInformationTop + 60);
    if (order.customer.address.city) {
      doc.text(`${order.customer.address.city}`, 300, customerInformationTop + 75);
    }
  }

  doc.moveDown();
}

function generateInvoiceTable(doc, order) {
  let i;
  const invoiceTableTop = 330;

  doc.font('Helvetica-Bold');
  generateTableRow(
    doc,
    invoiceTableTop,
    'Article',
    'Quantité',
    'Prix unitaire',
    'Total'
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font('Helvetica');

  let position = invoiceTableTop + 30;

  for (i = 0; i < order.orderItems.length; i++) {
    const item = order.orderItems[i];
    position = invoiceTableTop + 30 + (i * 30);

    generateTableRow(
      doc,
      position,
      item.name,
      item.quantity.toString(),
      formatCurrency(item.price),
      formatCurrency(item.price * item.quantity)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = position + 40;
  generateTableRow(
    doc,
    subtotalPosition,
    '',
    '',
    'Sous-total:',
    formatCurrency(order.subtotal)
  );

  if (order.discount > 0) {
    const discountPosition = subtotalPosition + 20;
    generateTableRow(
      doc,
      discountPosition,
      '',
      '',
      'Remise:',
      `-${formatCurrency(order.discount)}`
    );
  }

  const taxPosition = subtotalPosition + (order.discount > 0 ? 40 : 20);
  generateTableRow(
    doc,
    taxPosition,
    '',
    '',
    'TVA:',
    formatCurrency(order.tax)
  );

  const totalPosition = taxPosition + 25;
  doc.font('Helvetica-Bold');
  generateTableRow(
    doc,
    totalPosition,
    '',
    '',
    'TOTAL:',
    formatCurrency(order.total)
  );
  doc.font('Helvetica');
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      'Merci pour votre confiance. Pour toute question concernant cette facture, contactez-nous.',
      50,
      780,
      { align: 'center', width: 500 }
    );
}

function generateTableRow(doc, y, item, quantity, unitCost, lineTotal) {
  doc
    .fontSize(10)
    .text(item, 50, y, { width: 250 })
    .text(quantity, 300, y, { width: 90, align: 'right' })
    .text(unitCost, 390, y, { width: 90, align: 'right' })
    .text(lineTotal, 480, y, { width: 90, align: 'right' });
}

function generateHr(doc, y) {
  doc
    .strokeColor('#aaaaaa')
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function getStatusLabel(status) {
  const labels = {
    pending: 'En attente',
    confirmed: 'Confirmée',
    processing: 'En traitement',
    shipped: 'Expédiée',
    delivered: 'Livrée',
    cancelled: 'Annulée'
  };
  return labels[status] || status;
}

function getTypeLabel(type) {
  const labels = {
    whatsapp: 'WhatsApp',
    pos: 'Point de vente',
    online: 'En ligne'
  };
  return labels[type] || type;
}

module.exports = {
  generateInvoice
};

