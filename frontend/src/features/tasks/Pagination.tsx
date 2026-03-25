import { InputField } from '#/components/InputField'
import { Button } from '#/components/ui/Button'
import type { TaskSearchType } from '#/types/task.types'
import type { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Pagination = ({
  navigation,
  filters,
  totalPages,
}: {
  totalPages: number
  filters: TaskSearchType
  navigation: ReturnType<typeof useNavigate>
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  return (
    <footer className="mt-auto flex">
      <Button
        disabled={filters.page ? filters.page <= 1 : true}
        onClick={() => {
          setCurrentPage(filters.page ? +filters.page - 1 : 1)
          navigation({
            to: '/tasks',
            search: (prevSearch) => ({
              ...prevSearch,
              page: +(prevSearch.page ?? 1) - 1,
            }),
          })
        }}
        type="button"
      >
        Previous Page
      </Button>
      <InputField
        className="w-15 py-2 ring-0 border-0 focus-visible:border-0  focus-visible:ring-0 block  bg-primary/25 text-accent"
        min={1}
        max={totalPages}
        onChange={(e) => {
          setCurrentPage(+e.target.value)
        }}
        onBlur={(e) =>
          navigation({
            to: '/tasks',
            search: (prev) => ({ ...prev, page: e.target.value }),
          })
        }
        value={currentPage}
        type="number"
      />
      <Button
        type="button"
        disabled={(filters.page ? filters.page : 1) >= totalPages}
        onClick={() => {
          setCurrentPage(filters.page ? +filters.page + 1 : 1)
          navigation({
            to: '/tasks',
            search: (prevSearch) => ({
              ...prevSearch,
              page: +(prevSearch.page ?? 1) + 1,
            }),
          })
        }}
      >
        Next Page
      </Button>
    </footer>
  )
}
