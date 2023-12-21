import React, { ReactNode, useMemo, useState } from "react";
import "./App.css";
import {
  AlertDialog,
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  Table,
  Text,
  TextField,
} from "@radix-ui/themes";

import {
  CellContext,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { UserModel } from "./model";
import { defaultUserData } from "./mockData/usersData";
import { MagnifyingGlassIcon, Pencil1Icon } from "@radix-ui/react-icons";

function App() {
  //States
  const columnHelper = createColumnHelper<UserModel>();
  const [data, setData] = useState<UserModel[]>(defaultUserData);
  const [selectedUser, setSelectedUser] = useState<UserModel>();
  const [sorting, setSorting] = React.useState<SortingState>([]);

  //create table columns
  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row.name, {
        id: "name",

        header: () => <>Name</>,
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),

      columnHelper.accessor((row) => row.email, {
        id: "email",
        header: () => <>Email</>,
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor((row) => row.status, {
        id: "status",
        header: "Status",
        cell: (info) => info.getValue(),
        enableSorting: false,
        filterFn: "equalsString",
      }),
      columnHelper.accessor((row) => row.role, {
        header: "Role",
        id: "role",
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }: CellContext<UserModel, ReactNode>) => (
          <AlertDialog.Trigger onClick={() => setSelectedUser(row.original)}>
            <>
              <IconButton variant="soft" style={{ cursor: "pointer" }}>
                <Pencil1Icon width="18" height="18" />
              </IconButton>
            </>
          </AlertDialog.Trigger>
        ),
      },
    ],
    []
  );

  //create table
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <Box className="bg-stone-100 rounded" style={{ minHeight: "100vh" }}>
      <Container pt={"9"}>
        <AlertDialog.Root>
          {/* Search Field */}
          <Flex
            className="flex-col md:flex-row"
            grow={"1"}
            gap={"3"}
            justify={"end"}
            mb={"6"}
          >
            <TextField.Root
              size={"3"}
              className="w-11/12 mx-auto md:mx-0 md:w-2/6 "
            >
              <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" />
              </TextField.Slot>
              <TextField.Input
                placeholder="Search status ..."
                value={
                  (table.getColumn("status")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("status")?.setFilterValue(event.target.value)
                }
              />
            </TextField.Root>
            <TextField.Root
              size={"3"}
              className="w-11/12 mx-auto md:mx-0 md:w-2/6"
            >
              <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" />
              </TextField.Slot>
              <TextField.Input
                placeholder="Search user ..."
                value={
                  (table.getColumn("name")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
                }
              />
            </TextField.Root>
          </Flex>

          <Table.Root variant="surface">
            <Table.Header>
              {table.getHeaderGroups().map((headerGroup) => (
                <Table.Row key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Table.ColumnHeaderCell
                      key={header.id}
                      style={{
                        textAlign: "center",
                        cursor: header.column.getCanSort() ? "pointer" : "",
                      }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              ))}
            </Table.Header>
            <Table.Body>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row, index) => (
                  <Table.Row key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      if (cell.id === "name") {
                        return (
                          <Table.RowHeaderCell
                            className="align-middle"
                            key={cell.id}
                            style={{
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Table.RowHeaderCell>
                        );
                      }
                      return (
                        <Table.Cell
                          className="align-middle"
                          key={cell.id}
                          style={{
                            textAlign: "center",
                            verticalAlign: "middle",
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Table.Cell>
                      );
                    })}
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Root>

          <AlertDialog.Content style={{ maxWidth: 450 }}>
            <AlertDialog.Title>Edit User</AlertDialog.Title>
            <AlertDialog.Description size="2">
              You want to edit user with name : {selectedUser?.name} and email :{" "}
              {selectedUser?.email}
            </AlertDialog.Description>

            <Flex gap="3" mt="4" justify="end">
              <AlertDialog.Cancel>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button variant="solid" color="red">
                  Okay
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </Container>
    </Box>
  );
}

export default App;
