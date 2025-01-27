import s from './Table.module.scss'
import { clsx } from 'clsx'
import { ComponentPropsWithoutRef } from 'react'

const Root = ({ className, ...props }: ComponentPropsWithoutRef<'table'>) => {
  return <table className={clsx(s.root, className)} {...props} />
}

const Header = (props: ComponentPropsWithoutRef<'thead'>) => {
  return <thead {...props} />
}

const Body = (props: ComponentPropsWithoutRef<'tbody'>) => {
  return <tbody {...props} />
}

const Row = ({ className, ...props }: ComponentPropsWithoutRef<'tr'>) => {
  return <tr className={clsx(s.row, className)} {...props} />
}

const HeadCell = ({ className, ...props }: ComponentPropsWithoutRef<'th'>) => {
  return (
    <th className={clsx(s.headCell, className)} align={'left'} {...props} />
  )
}

const Cell = ({ className, ...props }: ComponentPropsWithoutRef<'td'>) => {
  return <td className={clsx(s.cell, className)} {...props} />
}

export const Table = {
  Root,
  Header,
  Body,
  Row,
  HeadCell,
  Cell,
}
