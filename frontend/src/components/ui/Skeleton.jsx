export function SkeletonCard({ className = '' }) {
  return (
    <div className={`animate-pulse bg-[#1A1A1A] ${className}`}>
      <div className="w-full h-full bg-gradient-to-r from-[#1A1A1A] via-[#222] to-[#1A1A1A] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
    </div>
  )
}

export function GallerySkeleton() {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {[280, 200, 320, 240, 300, 220].map((h, i) => (
        <div key={i} className="break-inside-avoid animate-pulse bg-[#1A1A1A]" style={{ height: h }} />
      ))}
    </div>
  )
}

export function VideoSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="aspect-[9/16] animate-pulse bg-[#1A1A1A]" />
      ))}
    </div>
  )
}
