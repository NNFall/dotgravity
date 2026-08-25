"use client";

import {
  ArrowRight,
  Church,
  Coffee,
  Gift,
  Image as ImageIcon,
  MapPin,
  Phone,
  type IconProps,
} from "@phosphor-icons/react";

const iconByName = {
  arrowRight: ArrowRight,
  church: Church,
  coffee: Coffee,
  gift: Gift,
  image: ImageIcon,
  mapPin: MapPin,
  phone: Phone,
} as const;

export type PhosphorIconName = keyof typeof iconByName;

interface PhosphorIconProps extends IconProps {
  name: PhosphorIconName;
}

/**
 * Keeps the third-party icon runtime inside a client component boundary.
 * Server-rendered hero components may pass serializable SVG props through it.
 */
export function PhosphorIcon({ name, ...props }: PhosphorIconProps) {
  const Icon = iconByName[name];

  return <Icon {...props} />;
}
