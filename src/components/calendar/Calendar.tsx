import { useMemo } from 'react'
import type { CalendarProps, CalendarPart } from './calendar.types'
import {
  formatDateParts,
  formatTimeSpec,
  getMonthGrid,
  getMonthKey,
  getWeekGrid,
  normalizeCalendarValue,
} from './calendar.logic'
import { cx } from '../../shared/style-props'
import styles from './calendar.module.css'

function partClass(
  classNames: CalendarProps['classNames'],
  part: CalendarPart,
  internalClass: string,
): string {
  return cx(internalClass, classNames?.[part]) ?? internalClass
}

export function Calendar({
  value,
  variant = 'date-label',
  locale = 'zh-CN',
  weekStartsOn = 1,
  tone = 'paper',
  density = 'comfortable',
  classNames,
  className,
  style,
  ...rest
}: CalendarProps) {
  const normalized = useMemo(() => normalizeCalendarValue(value), [value])
  const parts = useMemo(
    () => formatDateParts(normalized.date, locale),
    [normalized.date, locale],
  )
  const timeLabel = formatTimeSpec(normalized.time)
  const context = normalized.context
  const monthGrid =
    variant === 'month'
      ? getMonthGrid(getMonthKey(normalized.date), weekStartsOn, normalized.date)
      : undefined
  const weekGrid =
    variant === 'week'
      ? getWeekGrid(normalized.date, weekStartsOn, normalized.date)
      : undefined
  const rootClassName = partClass(classNames, 'root', styles.root)

  return (
    <div
      {...rest}
      className={cx(rootClassName, className)}
      style={style}
      data-component="calendar"
      data-variant={variant}
      data-tone={tone}
      data-density={density}
    >
      {variant === 'month' && monthGrid ? (
        <MonthView
          monthLabel={parts.monthLabel}
          grid={monthGrid}
          classNames={classNames}
        />
      ) : variant === 'week' && weekGrid ? (
        <WeekView
          monthLabel={parts.monthLabel}
          grid={weekGrid}
          classNames={classNames}
        />
      ) : (
        <div className={partClass(classNames, 'header', styles.header)}>
          <span
            className={partClass(classNames, 'weekday', styles.weekday)}
            data-part="weekday"
          >
            {parts.weekday}
          </span>
          <time
            className={partClass(classNames, 'date', styles.date)}
            data-part="date"
            dateTime={normalized.date}
            aria-label={`${parts.year}${parts.month}${parts.day}`}
          >
            <span className={styles.day}>{parts.day}</span>
            <span className={styles.month}>{parts.month}</span>
          </time>
          {timeLabel ? (
            <span
              className={partClass(classNames, 'time', styles.time)}
              data-part="time"
            >
              {timeLabel}
            </span>
          ) : null}
        </div>
      )}

      {variant === 'date-weather' || context ? (
        <div
          className={partClass(classNames, 'context', styles.context)}
          data-part="context"
        >
          {context?.weather || context?.temperature ? (
            <span
              className={partClass(classNames, 'weather', styles.contextItem)}
              data-part="weather"
            >
              {[context.weather, context.temperature].filter(Boolean).join(' · ')}
            </span>
          ) : null}
          {context?.location ? (
            <span
              className={partClass(classNames, 'location', styles.contextItem)}
              data-part="location"
            >
              {context.location}
            </span>
          ) : null}
          {context?.event ? (
            <span
              className={partClass(classNames, 'event', styles.event)}
              data-part="event"
            >
              {context.event}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

type MonthViewProps = {
  monthLabel: string
  grid: ReturnType<typeof getMonthGrid>
  classNames: CalendarProps['classNames']
}

function MonthView({ monthLabel, grid, classNames }: MonthViewProps) {
  const weekdays = ['一', '二', '三', '四', '五', '六', '日']
  return (
    <div className={styles.monthView}>
      <div
        className={partClass(classNames, 'month', styles.monthHeading)}
        data-part="month"
      >
        {monthLabel}
      </div>
      <div
        className={partClass(classNames, 'grid', styles.grid)}
        data-part="grid"
        aria-label="月历"
      >
        {weekdays.map((weekday) => (
          <span className={styles.gridWeekday} key={weekday}>
            {weekday}
          </span>
        ))}
        {grid.map((day) => (
          <time
            className={cx(
              styles.dayCell,
              !day.isCurrentMonth && styles.outsideMonth,
              day.isToday && styles.today,
              classNames?.dayCell,
            )}
            data-part="dayCell"
            data-current-month={day.isCurrentMonth || undefined}
            data-today={day.isToday || undefined}
            dateTime={day.isoDate}
            aria-label={day.isoDate}
            key={day.isoDate}
          >
            {day.day}
          </time>
        ))}
      </div>
    </div>
  )
}

type WeekViewProps = {
  monthLabel: string
  grid: ReturnType<typeof getWeekGrid>
  classNames: CalendarProps['classNames']
}

function WeekView({ monthLabel, grid, classNames }: WeekViewProps) {
  const weekdays = ['一', '二', '三', '四', '五', '六', '日']
  return (
    <div className={styles.weekView}>
      <div className={styles.weekHeading}>
        <span>这一周</span>
        <strong>{monthLabel}</strong>
      </div>
      <div className={partClass(classNames, 'grid', styles.weekGrid)} data-part="grid" aria-label="周历">
        {grid.map((day, index) => (
          <div className={styles.weekCell} key={day.isoDate}>
            <span className={styles.weekWeekday}>{weekdays[index]}</span>
            <time
              className={cx(styles.weekDay, day.isToday && styles.today)}
              data-part="dayCell"
              data-today={day.isToday || undefined}
              dateTime={day.isoDate}
              aria-label={day.isoDate}
            >
              {day.day}
            </time>
          </div>
        ))}
      </div>
    </div>
  )
}
