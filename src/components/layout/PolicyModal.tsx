"use client";

import { useEffect, useState } from "react";
import { chrome } from "@/lib/i18n/chrome";
import { useLocale } from "@/lib/i18n/client";
import type { SitePolicyModal } from "@/lib/data";

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M0.6 0.6L17.4 17.4" stroke="#212121" strokeWidth="1.35" />
      <path d="M17.4 0.6L0.6 17.4" stroke="#212121" strokeWidth="1.35" />
    </svg>
  );
}

export default function PolicyModal({
  kind,
  modal,
  contained = false,
}: {
  kind: "policy" | "privacy";
  modal: SitePolicyModal;
  /** Render the dialog inside its own relative container instead of a
   *  fixed full-screen overlay (used by the admin preview frame). */
  contained?: boolean;
}) {
  const t = chrome[useLocale()];
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open || contained) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;

  const close = () => setOpen(false);
  const modalClass =
    kind === "policy"
      ? "modal in modal_site_policy"
      : "modal in modal_site_privacy";
  const overlayPosition = contained ? "absolute" : "fixed";

  const overlay = (
    <>
      <div
        aria-hidden
        className="modal-backdrop in"
        onClick={close}
        style={{
          position: overlayPosition,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 1040,
          backgroundColor: "#000",
          opacity: 0.5,
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={modalClass}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        style={{
          position: overlayPosition,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 17000,
          overflowX: "hidden",
          overflowY: "auto",
          textAlign: "center",
          outline: 0,
        }}
      >
        <div
          className="w-[600px] max-[600px]:w-full"
          style={{
            position: "relative",
            display: "inline-block",
            textAlign: "left",
            verticalAlign: "middle",
            margin: "80px auto",
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "#fff",
              borderRadius: "3px",
              color: "#212121",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
              wordWrap: "break-word",
              outline: 0,
            }}
          >
            <div
              style={{
                padding: "24px",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <h4
                style={{
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "21.6px",
                }}
              >
                {modal.title}
              </h4>
              <a
                href="#"
                aria-label="Close"
                onClick={(event) => {
                  event.preventDefault();
                  close();
                }}
                style={{
                  display: "block",
                  marginTop: "4px",
                  lineHeight: 1,
                  color: "#212121",
                  cursor: "pointer",
                }}
              >
                <CloseIcon />
                <span className="sr-only">{t.common.close}</span>
              </a>
            </div>
            <div
              className="[&_strong]:font-semibold"
              style={{
                position: "relative",
                padding: "24px",
                fontSize: "15px",
                lineHeight: "24px",
                color: "#212121",
                textAlign: "left",
              }}
              dangerouslySetInnerHTML={{ __html: modal.html }}
            />
          </div>
        </div>
      </div>
    </>
  );

  if (!contained) return overlay;

  return (
    <div className="relative h-[600px] overflow-hidden" data-policy-preview>
      {overlay}
    </div>
  );
}
