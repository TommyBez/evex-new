'use client'

import { Search, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState, useTransition } from 'react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  AGENT_CATEGORIES,
  AGENT_SORTS,
  type AgentSort,
  DEFAULT_AGENT_SORT,
  getSortLabel,
  parseSort,
} from '@/lib/agents'
import { cn } from '@/lib/utils'

const DEFAULT_CATEGORY = 'all'
const SEARCH_URL_SYNC_DELAY_MS = 200

function getFiltersPath(
  search: string,
  category: string,
  sort: AgentSort,
): string {
  const next = new URLSearchParams()
  if (search) {
    next.set('q', search)
  }
  if (category !== DEFAULT_CATEGORY) {
    next.set('category', category)
  }
  if (sort !== DEFAULT_AGENT_SORT) {
    next.set('sort', sort)
  }

  const query = next.toString()
  return query ? `/?${query}` : '/'
}

function FilterChip({
  label,
  onRemove,
}: {
  label: string
  onRemove: () => void
}) {
  return (
    <button
      className="mono-label inline-flex items-center gap-1.5 rounded-md border border-border bg-background py-1 pr-1.5 pl-2 text-muted-foreground transition-colors hover:border-input hover:text-foreground"
      onClick={onRemove}
      type="button"
    >
      <span className="normal-case">{label}</span>
      <X aria-hidden="true" className="size-3" />
    </button>
  )
}

export function BrowseFilters() {
  const router = useRouter()
  const params = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const activeCategory = params.get('category') ?? DEFAULT_CATEGORY
  const activeSearch = params.get('q') ?? ''
  const activeSort = parseSort(params.get('sort') ?? undefined)
  const [searchValue, setSearchValue] = useState(activeSearch)
  const [selectedCategory, setSelectedCategory] = useState(activeCategory)
  const [selectedSort, setSelectedSort] = useState<AgentSort>(activeSort)
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const replaceFilters = useCallback(
    (nextSearch: string, nextCategory: string, nextSort: AgentSort) => {
      const path = getFiltersPath(nextSearch, nextCategory, nextSort)

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
    setSelectedSort(activeSort)
  }, [activeCategory, activeSort, isPending])

  useEffect(() => {
    if (searchValue === activeSearch) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      replaceFilters(searchValue, selectedCategory, selectedSort)
    }, SEARCH_URL_SYNC_DELAY_MS)

    return () => window.clearTimeout(timeoutId)
  }, [
    activeSearch,
    replaceFilters,
    searchValue,
    selectedCategory,
    selectedSort,
  ])

  const clearSearch = useCallback(() => {
    setSearchValue('')
    replaceFilters('', selectedCategory, selectedSort)
  }, [replaceFilters, selectedCategory, selectedSort])

  const changeCategory = useCallback(
    (nextCategory: string) => {
      setSelectedCategory(nextCategory)
      replaceFilters(searchValue, nextCategory, selectedSort)
    },
    [replaceFilters, searchValue, selectedSort],
  )

  const changeSort = useCallback(
    (nextSort: AgentSort) => {
      setSelectedSort(nextSort)
      replaceFilters(searchValue, selectedCategory, nextSort)
    },
    [replaceFilters, searchValue, selectedCategory],
  )

  const clearAll = useCallback(() => {
    setSearchValue('')
    setSelectedCategory(DEFAULT_CATEGORY)
    setSelectedSort(DEFAULT_AGENT_SORT)
    startTransition(() => {
      router.replace('/', { scroll: false })
    })
  }, [router])

  const categories = [DEFAULT_CATEGORY, ...AGENT_CATEGORIES] as const
  const hasCategory = selectedCategory !== DEFAULT_CATEGORY
  const hasSort = selectedSort !== DEFAULT_AGENT_SORT
  const hasActiveFilters = Boolean(searchValue) || hasCategory || hasSort

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <InputGroup className="h-10 flex-1 rounded-md bg-background">
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
          {searchValue ? (
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                aria-label="Clear search"
                onClick={clearSearch}
                size="icon-xs"
              >
                <X aria-hidden="true" />
              </InputGroupButton>
            </InputGroupAddon>
          ) : null}
        </InputGroup>
        <div className="flex items-center gap-2">
          <span className="mono-label hidden text-muted-foreground sm:inline">
            Sort
          </span>
          <NativeSelect
            aria-label="Sort agents"
            onChange={(e) => changeSort(parseSort(e.target.value))}
            value={selectedSort}
          >
            {AGENT_SORTS.map((sort) => (
              <NativeSelectOption key={sort.value} value={sort.value}>
                {sort.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
      </div>

      <ToggleGroup
        className={cn(
          'flex-wrap transition-opacity',
          isPending && 'opacity-60',
        )}
        onValueChange={(values) =>
          changeCategory(values[0] ?? DEFAULT_CATEGORY)
        }
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

      {hasActiveFilters ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="mono-label text-muted-foreground/70">Filters</span>
          {searchValue ? (
            <FilterChip label={`“${searchValue}”`} onRemove={clearSearch} />
          ) : null}
          {hasCategory ? (
            <FilterChip
              label={selectedCategory}
              onRemove={() => changeCategory(DEFAULT_CATEGORY)}
            />
          ) : null}
          {hasSort ? (
            <FilterChip
              label={getSortLabel(selectedSort)}
              onRemove={() => changeSort(DEFAULT_AGENT_SORT)}
            />
          ) : null}
          <button
            className="mono-label text-brand underline-offset-4 transition-colors hover:underline"
            onClick={clearAll}
            type="button"
          >
            Clear all
          </button>
        </div>
      ) : null}
    </div>
  )
}
