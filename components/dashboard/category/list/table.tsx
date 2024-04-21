"use client"

import { useRouter } from "next/navigation"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import CategoryDeleteDialog from "../delete"

export default function CategoryTable({
  categories,
  activeId,
}: {
  categories: any[]
  activeId: string
}) {
  const router = useRouter()
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[20px] sm:table-cell">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Subcategories</TableHead>

          <TableHead className="hidden md:table-cell">Total Products</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow
            key={category.id}
            onClick={() =>
              router.push(
                `/dashboard/${category.shop}/products/categories/${category.id}`
              )
            }
            className={`cursor-pointer ${
              activeId == category.id &&
              "bg-accent text-accent-foreground hover:bg-accent"
            }`}
          >
            <TableCell className="hidden md:table-cell">
              {category.id}
            </TableCell>

            <TableCell className="font-medium">{category.name}</TableCell>
            <TableCell>
              {category.subcategories ? category.subcategories.length : 0}
            </TableCell>
            <TableCell className="hidden md:table-cell">25</TableCell>

            <TableCell>
              <CategoryDeleteDialog data={category} iconOnly={true} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}