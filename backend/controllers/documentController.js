// controllers/documentController.js
const { uploadDocument, verifyDocument } = require('../models/documentModel');
const { extractTextWithOCR } = require('../services/ocrService');
const { verifyTextWithNLP } = require('../services/nlpService');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

exports.uploadDocument = [upload.single('document'), async (req, res) => {
  try {
    const documentPath = req.file.path;
    await uploadDocument(documentPath);
    const extractedText = await extractTextWithOCR(documentPath);
    const verifiedData = await verifyTextWithNLP(extractedText);

    res.status(200).json({ message: 'Document uploaded and verified successfully', data: verifiedData });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading or verifying document', error });
  }
}];
