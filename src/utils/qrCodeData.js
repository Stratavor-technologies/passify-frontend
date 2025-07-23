import QRCode1 from "../assets/images/qr_A.png";
import QRCode2 from "../assets/images/qr_B.png";
import b1 from "../assets/images/b1.png";
import b2 from "../assets/images/b2.png";

export const qrCodeData = [
  { value: "qr_code", label: "Qr Code", image: QRCode1, alt: "QRCode1" },
  { value: "aztec", label: "AZTEC", image: QRCode2, alt: "AZTEC" },
  { value: "pdf_417", label: "PDF 417", image: b1, alt: "pdf_417" },
  { value: "code_128", label: "CODE 128", image: b2, alt: "code_128" },
];
