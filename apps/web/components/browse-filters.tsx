'use client'

import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState, useTransition } from 'react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { AGENT_CATEGORIES } from '@/lib/agents'
import { cn } from '@/lib/utils'

const DEFAULT_CATEGORY = 'all'
const SEARCH_URL_SYNC_DELAY_MS = 200

function getFiltersPath(search: string, category: string): string {
  const next = new URLSearchParams()
  if (search) {
    next.set('q', search)
  }
  if (category !== DEFAULT_CATEGORY) {
    next.set('category', category)
  }

  const query = next.toString()
  return query ? `/?${query}` : '/'
}

export function BrowseFilters() {
  const router = useRouter()
  const params = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const activeCategory = params.get('category') ?? DEFAULT_CATEGORY
  const activeSearch = params.get('q') ?? ''
  const [searchValue, setSearchValue] = useState(activeSearch)
  const [selectedCategory, setSelectedCategory] = useState(activeCategory)
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const replaceFilters = useCallback(
    (nextSearch: string, nextCategory: string) => {
      const path = getFiltersPath(nextSearch, nextCategory)

      startTransition(() => {
        router.replace(path, { scroll: false })
      })
    },
    [router],
  )

  useEffect(() => {
    if (isSearchFocused) {
      return
    }
    setSearchValue(activeSearch)
  }, [activeSearch, isSearchFocused])

  useEffect(() => {
    if (isPending) {
      return
    }
    setSelectedCategory(activeCategory)
  }, [activeCategory, isPending])

  useEffect(() => {
    if (searchValue === activeSearch) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      replaceFilters(searchValue, selectedCategory)
    }, SEARCH_URL_SYNC_DELAY_MS)

    return () => window.clearTimeout(timeoutId)
  }, [activeSearch, replaceFilters, searchValue, selectedCategory])

  const categories = [DEFAULT_CATEGORY, ...AGENT_CATEGORIES] as const

  return (
    <div className="flex flex-col gap-4">
      <InputGroup className="h-10 rounded-md bg-background">
        <InputGroupAddon align="inline-start">
          <Search aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupInput
          aria-label="Search agents"
          onBlur={() => setIsSearchFocused(false)}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          placeholder="Search agents..."
          type="search"
          value={searchValue}
        />
      </InputGroup>
      <ToggleGroup
        className={cn(
          'flex-wrap transition-opacity',
          isPending && 'opacity-60',
        )}
        onValueChange={(values) => {
          const nextCategory = values[0] ?? DEFAULT_CATEGORY
          setSelectedCategory(nextCategory)
          replaceFilters(searchValue, nextCategory)
        }}
        value={[selectedCategory]}
      >
        {categories.map((c) => (
          <ToggleGroupItem
            className="mono-label rounded-md capitalize data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            key={c}
            size="sm"
            value={c}
            variant="outline"
          >
            {c}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}
