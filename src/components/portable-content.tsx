import { PortableText } from "@portabletext/react";

type PortableContentProps = {
  value: unknown;
};

export function PortableContent({ value }: PortableContentProps) {
  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }

  return <PortableText value={value as never} />;
}
