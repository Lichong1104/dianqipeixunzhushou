import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useHistory } from "react-router-dom";

// 设置 PDF.js 工作器路径
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PDFViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // 直接使用文件路径
  // const pdfUrl = "./shanbeianhui.pdf";
  const pdfUrl = "./ABB.pdf";

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // 添加一个跳转页面的通用函数
  const jumpToPage = (pageNum) => {
    const targetPage = parseInt(pageNum);
    if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= numPages) {
      setPageNumber(targetPage);
    }
    setInputPage("");
  };

  // 处理输入框失去焦点
  const handleBlur = () => {
    setIsFocused(false);
    if (inputPage) {
      jumpToPage(inputPage);
    }
  };

  // 处理回车跳转
  const handlePageJump = (e) => {
    e.preventDefault();
    if (inputPage) {
      jumpToPage(inputPage);
      e.target.querySelector("input").blur();
    }
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "white",
        padding: "20px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <form
            onSubmit={handlePageJump}
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              value={inputPage}
              onChange={(e) => {
                const value = e.target.value.replace(/[^\d]/g, "");
                setInputPage(value);
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={handleBlur}
              placeholder={!isFocused && !inputPage ? `${pageNumber}` : ""}
              style={{
                width: "44px",
                height: "24px",
                padding: "0 8px",
                borderRadius: "8px",
                border: "2px solid rgba(138, 75, 255, 0.2)",
                fontSize: "14px",
                fontWeight: "500",
                textAlign: "center",
                outline: "none",
                transition: "all 0.2s ease",
                color: "#8A4BFF",
                backgroundColor: "white",
              }}
            />
            <span
              style={{
                margin: "0 8px",
                color: "#8A4BFF",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              /
            </span>
            <span
              style={{
                color: "#8A4BFF",
                fontSize: "14px",
                fontWeight: "500",
                opacity: 0.7,
              }}
            >
              {numPages || "-"}
            </span>
          </form>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => jumpToPage(pageNumber - 1)}
            disabled={pageNumber <= 1}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              background: "rgba(138, 75, 255, 0.1)",
              color: "#8A4BFF",
              cursor: pageNumber <= 1 ? "not-allowed" : "pointer",
              fontSize: "14px",
              fontWeight: "500",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              opacity: pageNumber <= 1 ? 0.5 : 1,
              ":hover": {
                background: "rgba(138, 75, 255, 0.15)",
              },
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            上一页
          </button>
          <button
            onClick={() => jumpToPage(pageNumber + 1)}
            disabled={pageNumber >= numPages}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              background: "rgba(138, 75, 255, 0.1)",
              color: "#8A4BFF",
              cursor: pageNumber >= numPages ? "not-allowed" : "pointer",
              fontSize: "14px",
              fontWeight: "500",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              opacity: pageNumber >= numPages ? 0.5 : 1,
              ":hover": {
                background: "rgba(138, 75, 255, 0.15)",
              },
            }}
          >
            下一页
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          height: "100%",
          overflow: "auto",
          background: "#f8fafc",
          borderRadius: "12px",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "#64748b",
              }}
            >
              <div
                style={{
                  padding: "20px",
                  borderRadius: "12px",
                  background: "white",
                  boxShadow: "0 4px 20px rgba(138, 75, 255, 0.08)",
                }}
              >
                正在加载 PDF 文件...
              </div>
            </div>
          }
          error={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "#ef4444",
              }}
            >
              <div
                style={{
                  padding: "20px",
                  borderRadius: "12px",
                  background: "white",
                  boxShadow: "0 4px 20px rgba(138, 75, 255, 0.08)",
                }}
              >
                PDF 文件加载失败，请检查文件路径是否正确
              </div>
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            style={{
              boxShadow: "0 4px 20px rgba(138, 75, 255, 0.08)",
              borderRadius: "8px",
            }}
          />
        </Document>
      </div>
    </div>
  );
}

function Home() {
  const history = useHistory();
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #f6f3ff 0%, #ffffff 100%)",
      }}
    >
      {/* 超精美标题栏 */}
      <header
        style={{
          padding: "24px 40px",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(138, 75, 255, 0.08)",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: "1800px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #8A4BFF 0%, #B388FF 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 16px -4px rgba(138, 75, 255, 0.25)",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "24px",
                  fontWeight: "600",
                  background: "linear-gradient(135deg, #8A4BFF 0%, #B388FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "0.5px",
                }}
              >
                ABB电器培训智能助手
              </h1>
              <p
                style={{
                  margin: "4px 0 0 0",
                  fontSize: "14px",
                  color: "#64748b",
                }}
              >
                智能文档分析与问答系统
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            <button
              onClick={() => {
                history.push("/login");
              }}
              style={{
                padding: "10px 20px",
                borderRadius: "12px",
                border: "1px solid rgba(138, 75, 255, 0.1)",
                background: "white",
                color: "#8A4BFF",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(138, 75, 255, 0.08)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
              退出登录
            </button>
          </div>
        </div>
      </header>

      {/* 主要内容区域 */}
      <div
        style={{
          flex: 1,
          padding: "32px 40px",
          position: "relative",
          height: "80%",
        }}
      >
        <div
          style={{
            maxWidth: "1800px",
            margin: "0 auto",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* PDF预览区 */}
          <div
            style={{
              flex: "0 0 45%",
              display: "flex",
              flexDirection: "column",
              background: "white",
              borderRadius: "24px",
              boxShadow: "0 20px 40px rgba(138, 75, 255, 0.08)",
              border: "1px solid rgba(138, 75, 255, 0.05)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "16px 24px",
                borderBottom: "1px solid rgba(138, 75, 255, 0.05)",
                background: "rgba(138, 75, 255, 0.02)",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                }}
              >
                {["#ff5f57", "#ffbd2e", "#28c941"].map((color) => (
                  <span
                    key={color}
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: color,
                    }}
                  />
                ))}
              </div>
              <span
                style={{
                  fontSize: "14px",
                  color: "#1e293bcd",
                  fontWeight: "500",
                }}
              >
                文档预览
              </span>
            </div>

            <PDFViewer />
          </div>

          <div
            style={{
              flex: "0 0 53%", // 聊天框占60%宽度
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(138, 75, 255, 0.15)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "16px",
                borderBottom: "1px solid rgba(138, 75, 255, 0.1)",
                backgroundColor: "rgba(138, 75, 255, 0.05)",
                fontSize: "14px",
                color: "#6b7280",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#8A4BFF">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
              智能助手
            </div>
            <iframe
              src="https://www.kkbot.co/kkbot/embed/?info=bcfade79b82e74e846090d8b2472b586a9607cae8a65d53f031d932074e5a46fc8a577d6e50cfa2c706d3e39f1830252"
              style={{
                width: "100%",
                height: "calc(100% - 49px)", // 减去顶部栏高度
                border: "none",
              }}
              allow="microphone"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
