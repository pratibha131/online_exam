const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateCertificate = (name, examTitle, score) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const certPath = path.join(__dirname, `../certificates/${name}_${examTitle}.pdf`);
        
        doc.pipe(fs.createWriteStream(certPath));

        doc.fontSize(24).text("Certificate of Achievement", { align: "center" });
        doc.moveDown();
        doc.fontSize(18).text(`This certifies that ${name} has successfully passed the ${examTitle} exam with a score of ${score}.`, {
            align: "center"
        });

        doc.end();
        resolve(certPath);
    });
};

module.exports = generateCertificate;
