import React, { useState } from "react";
import { setToken } from "@/utils/handleToken";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username === "admin" && formData.password === "admin") {
      setToken("123456");
      history.push("/");
    } else {
      setError("用户名或密码错误");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f6f3ff 0%, #ffffff 100%)",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "40px",
          background: "white",
          borderRadius: "24px",
          boxShadow: "0 20px 40px rgba(138, 75, 255, 0.08)",
          border: "1px solid rgba(138, 75, 255, 0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
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
              }}
            >
              欢迎登录
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

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="用户名"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid rgba(138, 75, 255, 0.1)",
                fontSize: "14px",
                outline: "none",
                transition: "all 0.3s",
              }}
            />
          </div>
          <div style={{ marginBottom: "24px" }}>
            <input
              type="password"
              placeholder="密码"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid rgba(138, 75, 255, 0.1)",
                fontSize: "14px",
                outline: "none",
                transition: "all 0.3s",
              }}
            />
          </div>
          {error && (
            <div
              style={{
                color: "#ef4444",
                fontSize: "14px",
                marginBottom: "16px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #8A4BFF 0%, #B388FF 100%)",
              color: "white",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 16px -4px rgba(138, 75, 255, 0.25)",
              "&:hover": {
                transform: "translateY(-1px)",
                boxShadow: "0 10px 20px -4px rgba(138, 75, 255, 0.3)",
              },
              "&:active": {
                transform: "translateY(0)",
              },
            }}
          >
            登录
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
