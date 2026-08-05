import { useState } from "react";
import { getMySemesterReport } from "../services/markService";
import calculatePercentage from "../utils/percentageCalculator";
import calculateGrade from "../utils/gradeCalculator";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import { Document, Page, pdfjs } from "react-pdf";

import signature from "../assets/images/signature.jpg";
import stamp from "../assets/images/stamp.png";
import Loader from "../components/Loader";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function StudentReports() {
  const [semester, setSemester] = useState("");

  const [pdfUrl, setPdfUrl] = useState(null);
  const [reportStudentName, setReportStudentName] = useState("");

  const [pageNumber] = useState(1);
  const [zoom, setZoom] = useState(1);

  const [loading, setLoading] = useState(false);

  const hSemester = (event) => {
    setSemester(event.target.value);
  };

  const resetAll = () => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }

    setSemester("");
    setPdfUrl(null);
    setReportStudentName("");
    setZoom(1);
    setLoading(false);
  };

  const previewReport = async () => {
    if (semester === "") {
      alert("Please select Semester");
      return;
    }

    setLoading(true);

    try {
      const res = await getMySemesterReport(semester);

      const reportData = res.data;

      if (reportData.length === 0) {
        alert("No Marks Found");
        setLoading(false);
        return;
      }

      const percentage = calculatePercentage(
        reportData.map((r) => r.marks)
      );

      const grade = calculateGrade(Number(percentage));

      const pdf = new jsPDF();

      pdf.setDrawColor(15, 23, 41);
      pdf.setLineWidth(0.6);
      pdf.rect(8, 8, 194, 281);

      pdf.setTextColor(15, 23, 41);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(18);

      pdf.text("ACADEMIC MANAGEMENT SYSTEM", 105, 20, { align: "center" });

      pdf.setTextColor(37, 99, 235);
      pdf.setFontSize(13);

      pdf.text("Student Report Card", 105, 29, { align: "center" });

      pdf.line(20, 35, 190, 35);

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);

      let y = 47;

      const detailRow = (label, value) => {
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(100, 116, 139);

        pdf.text(label, 20, y);

        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(15, 23, 41);

        pdf.text(String(value), 55, y);

        y += 8;
      };

      detailRow("Student Name :", reportData[0].name);

      detailRow("Roll No :", reportData[0].rollno);

      detailRow("Program :", reportData[0].program);

      detailRow("Semester :", reportData[0].semester);

      autoTable(pdf, {
        startY: y + 6,

        head: [["Subject", "Marks"]],

        body: reportData.map((r) => [r.subject, r.marks]),

        theme: "grid",

        headStyles: {
          fillColor: [37, 99, 235],
        },
      });

      const finalY = pdf.lastAutoTable.finalY + 12;

      const total = reportData.reduce(
        (sum, r) => sum + Number(r.marks),
        0
      );

      pdf.setFont("helvetica", "bold");

      pdf.text(
        `Total Marks : ${total}/${reportData.length * 100}`,
        20,
        finalY
      );

      pdf.text(`Percentage : ${percentage}%`, 20, finalY + 8);

      pdf.text(`Grade : ${grade}`, 20, finalY + 16);

      pdf.addImage(signature, "JPEG", 130, finalY + 8, 40, 18);

      pdf.line(128, finalY + 30, 175, finalY + 30);

      pdf.setFontSize(10);

      pdf.text("Authorized Signature", 151, finalY + 37, {
        align: "center",
      });

      pdf.addImage(stamp, "PNG", 134, finalY + 40, 35, 35);

      pdf.text(
        `Generated On : ${new Date().toLocaleDateString()}`,
        20,
        finalY + 72
      );

      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }

      setZoom(1);

      const blob = pdf.output("blob");

      const url = URL.createObjectURL(blob);

      setPdfUrl(url);

      setReportStudentName(reportData[0].name);

      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <div className="page">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1>My Reports</h1>

            <form className="report-card">
              <div className="report-row">
                <select value={semester} onChange={hSemester}>
                  <option value="">Select Semester</option>

                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                  <option value="3">Semester 3</option>
                  <option value="4">Semester 4</option>
                  <option value="5">Semester 5</option>
                  <option value="6">Semester 6</option>
                  <option value="7">Semester 7</option>
                  <option value="8">Semester 8</option>
                </select>
              </div>

              <div className="btn-row">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={previewReport}
                  disabled={loading}
                >
                  Preview Report
                </button>

                <button
                  type="button"
                  className="reset-btn"
                  onClick={resetAll}
                  disabled={loading}
                >
                  Reset
                </button>
              </div>
            </form>

            {pdfUrl && (
              <>
                <hr />

                <h2>Preview Report</h2>

                <div className="pdf-preview-container">
                  <div className="zoom-controls">
                    <button
                      className="zoom-btn"
                      onClick={() =>
                        setZoom((z) => Math.max(0.5, z - 0.1))
                      }
                      title="Zoom Out"
                    >
                      <FiZoomOut />
                    </button>

                    <span>{Math.round(zoom * 100)}%</span>

                    <button
                      className="zoom-btn"
                      onClick={() =>
                        setZoom((z) => Math.min(3, z + 0.1))
                      }
                      title="Zoom In"
                    >
                      <FiZoomIn />
                    </button>
                  </div>

                  <Document file={pdfUrl}>
                    <Page pageNumber={pageNumber} scale={zoom} />
                  </Document>
                </div>

                <br />

                <button
                  className="btn-primary"
                  onClick={() => {
                    const link = document.createElement("a");

                    link.href = pdfUrl;

                    const name = reportStudentName
                      .toLowerCase()
                      .split(" ")
                      .join("-");

                    link.download = `${name}-report-sem${semester}.pdf`;

                    link.click();

                    resetAll();
                  }}
                >
                  Download PDF
                </button>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default StudentReports;