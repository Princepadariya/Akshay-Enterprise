import { renderOg, ogSize } from "@/lib/og";
import { getCategory, getProduct, products } from "@/content/products";
import { materialName } from "@/content/materials";

export const alt = "Akshay Enterprise product";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return products.map((p) => ({ category: p.category, product: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ category: string; product: string }> }) {
  const { category, product } = await params;
  const p = getProduct(category, product);
  const c = getCategory(category);
  return renderOg({
    kicker: c?.short ?? "Product",
    title: p?.name ?? "Precision component",
    spec: p ? `${p.materials.slice(0, 3).map(materialName).join(" / ")}  |  ${p.sizes}` : undefined,
  });
}
