"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { SearchIcon } from "lucide-react"
import { useDebouncedCallback } from "use-debounce"

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set("search", term)
    } else {
      params.delete("search")
    }
    if (params.get("page")) {
      params.delete("page")
    }
    replace(`${pathname}?${params.toString()}`)
  }, 500)

  return (
    <div className="z-0 relative flex flex-1 shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full h-8 rounded-md bg-secondary border py-[9px] pl-10 text-sm outline-2 placeholder:text-muted-foreground"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get("search")?.toString()}
      />
      <SearchIcon className="absolute left-3 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" />
    </div>
  )
}
