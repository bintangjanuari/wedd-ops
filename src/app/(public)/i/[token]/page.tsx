import { Metadata } from "next";
import { PublicInvoiceClient } from "./invoice-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>;
}): Promise<Metadata> {
  const { token } = await params;
  return {
    title: `Faktur Pembayaran Digital | WeddOps`,
    description: `Rincian faktur pembayaran digital dan konfirmasi pelunasan klien vendor.`,
  };
}

export default async function PublicInvoicePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <PublicInvoiceClient token={token} />;
}

