"use client";
import React, { useEffect, useRef } from "react";
import QRCode from "qrcode";
import { getTableLink } from "@/lib/utils";

function QRCodeTable({
  tableNumber,
  token,
  width = 250,
}: {
  tableNumber: number;
  token: string;
  width?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const link = getTableLink({
    token: token,
    tableNumber: tableNumber,
  });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const canvasContext = canvas.getContext("2d")!;
    canvas.height = width + 70;
    canvas.width = width;
    (canvasContext.fillStyle = "#fff"),
      canvasContext?.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.font = "20px Arial";
    canvasContext.fillStyle = "black";
    canvasContext.textAlign = "center";
    canvasContext.fillText(
      `Bàn số ${tableNumber}`,
      canvas.width / 2,
      canvas.width + 20
    );
    canvasContext.fillText(
      `Quét mã để gọi món`,
      canvas.width / 2,
      canvas.width + 50
    );
    const qr = document.createElement("canvas")
   
    QRCode.toCanvas(qr, link, function (error) {
      if (error) console.error(error);
      console.log("success!");
      canvasContext.drawImage(qr, 0, 0, width, width)
    });
  }, [token, tableNumber, width]);
  return <canvas ref={canvasRef}></canvas>;
}

export default QRCodeTable;
