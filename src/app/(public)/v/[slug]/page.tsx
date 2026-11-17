import { Metadata } from "next";
import { PricelistClient } from "./pricelist-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Pricelist & Cek Slot Mandiri | Sanggar Ayu Lestari - WeddOps`,
    description: `Cek ketersediaan slot tanggal pernikahan dan hitung estimasi biaya paket rias pengantin mandiri.`,
  };
}

export default async function PublicPricelistPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PricelistClient slug={slug} />;
}

