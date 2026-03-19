import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from './ui/calendar'
import { format } from 'date-fns'
import { Button } from './ui/Button'
import { cn } from '#/lib/utils'
import type { Matcher } from 'react-day-picker'

export const CalendarField = ({
  date,
  onSelect,
  error,
  disableBefore,
  disableAfter,
}: {
  date: Date | undefined
  onSelect: (date: Date | undefined) => void
  error?: boolean
  disableBefore?: Date
  disableAfter?: Date
}) => {
  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          `bg-primary/10 border-primary/80 rounded-md  hover:ring-primary/80  active:translate-0  `,
          error
            ? 'border-destructive bg-destructive/15 focus-visible:ring-destructive '
            : '',
        )}
        render={
          <Button
            data-empty={!date}
            className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground rounded-md "
          />
        }
      >
        <CalendarIcon />
        {date ? (
          format(date, 'PPP')
        ) : (
          <span className="text-primary-foreground/20">Pick a date</span>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-primary-foreground">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          disabled={
            [
              disableBefore ? { before: disableBefore } : false,
              disableAfter ? { after: disableAfter } : false,
            ].filter(Boolean) as Matcher[]
          }
        />
      </PopoverContent>
    </Popover>
  )
}
