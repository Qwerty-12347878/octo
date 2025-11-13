import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "@/store/store";
import {
  setFilter,
  setCurrentPage,
  setEmployees,
} from "@/store/slices/employeeSlice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Plus,
  Search,
  Users,
  MoreVertical,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

// Utility function for safe lowercase conversion
const safeToLowerCase = (value: any): string => {
  if (value === null || value === undefined) return "";
  return value.toString().toLowerCase();
};

const Employees = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filteredEmployees, currentFilter, currentPage } = useSelector(
    (state: RootState) => state.employee
  );

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [designationFilter, setDesignationFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<any>(null);

  // Fetch employees from backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/employees");
        if (!res.ok) throw new Error("Failed to fetch employees");
        const data = await res.json();

        const employees = data.map((emp: any) => ({
          id: emp._id,
          uniqueId: emp.uniqueId,
          firstName: emp.firstName,
          middleName: emp.middleName,
          lastName: emp.lastName,
          email: emp.email,
          phoneNumber: emp.phone,
          dateOfBirth: emp.dob,
          dateOfJoining: emp.dateOfJoining,
          state: emp.state,
          city: emp.city,
          status: emp.status ? emp.status.toLowerCase() : "active",
          totalExperience: emp.experienceYears,
          gender: emp.gender ? emp.gender.toLowerCase() : "",
          emergencyContactName: emp.emergencyContactName,
          emergencyContactNumber: emp.emergencyContactNumber,
          currentAddress: emp.currentAddress,
          permanentAddress: emp.permanentAddress,
          currentSalary: emp.currentSalary,
          highestQualification: emp.highestQualification,
          accountHolderName: emp.accountHolderName,
          bankName: emp.bankName,
          accountNumber: emp.accountNumber,
          ifscCode: emp.ifscCode,
          designation: emp.designation,
          technologies: emp.technologies || [],
          note: emp.notes || "",
          // Safe array initialization
          phoneNumbers: emp.phoneNumbers || [],
          socialMedia: emp.socialMedia || [],
        }));

        dispatch(setEmployees(employees));
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [dispatch]);

  // Handlers
  const handleFilterChange = (filter: "all" | "active" | "Inactive") => {
    dispatch(setFilter(filter));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleCreateEmployee = () => {
    navigate("/dashboard/employees/create");
  };

  const handleRowSelect = (employeeId: string) => {
    setSelectedRows((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === paginatedEmployees.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedEmployees.map((emp) => emp.id));
    }
  };

  // CRUD Handlers
  const handleEdit = (employee: any) => {
    setCurrentEmployee(employee);
    setIsEditOpen(true);
  };

  const handleView = (employee: any) => {
    setCurrentEmployee(employee);
    setIsViewOpen(true);
  };

  // ✅ Delete API - CORRECT
  const handleDelete = async (employeeId: string) => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/employees/${employeeId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete employee");
      }

      // Redux state update
      dispatch(
        setEmployees(filteredEmployees.filter((emp) => emp.id !== employeeId))
      );

      alert("Employee deleted successfully!");
    } catch (err: any) {
      console.error("Delete error:", err);
      alert(`Error deleting employee: ${err.message}`);
    }
  };

  // ✅ Update API - FIXED with safe array handling
  const handleSaveEdit = async (updatedData: any) => {
    if (!currentEmployee) return;

    try {
      console.log("Updating employee with ID:", currentEmployee.id);
      console.log("Data being sent:", updatedData);

      // Transform data to match backend expectations - SAFE VERSION
      const backendData: any = {
        firstName: updatedData.firstName || "",
        lastName: updatedData.lastName || "",
        email: updatedData.email || "",
        phone: updatedData.phoneNumber || "",
        designation: updatedData.designation || "",
        status: updatedData.status || "active",
        technologies: updatedData.technologies || [],
        notes: updatedData.note || "",
      };

      // Only include phoneNumbers if it exists and is an array - SAFE HANDLING
      if (Array.isArray(updatedData.phoneNumbers)) {
        backendData.phoneNumbers = updatedData.phoneNumbers
          .map((number: any) => (number ? number.toString() : ""))
          .filter((num: string) => num !== "");
      }

      // Only include socialMedia if it exists and is an array - SAFE HANDLING
      if (Array.isArray(updatedData.socialMedia)) {
        backendData.socialMedia = updatedData.socialMedia
          .map((account: any) => (account ? safeToLowerCase(account) : ""))
          .filter((acc: string) => acc !== "");
      }

      console.log("Backend data:", backendData);

      // Use currentEmployee.id instead of hardcoded ID
      const res = await fetch(
        `http://localhost:5000/api/employees/${currentEmployee.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(backendData),
        }
      );

      console.log("Response status:", res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server error response:", errorText);
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      const updatedEmployee = await res.json();
      console.log("Updated employee response:", updatedEmployee);

      // SAFE Redux update
      dispatch(
        setEmployees(
          filteredEmployees.map((emp) =>
            emp.id === currentEmployee.id
              ? {
                  ...emp,
                  firstName: updatedEmployee.firstName || emp.firstName,
                  lastName: updatedEmployee.lastName || emp.lastName,
                  email: updatedEmployee.email || emp.email,
                  phoneNumber: updatedEmployee.phone || emp.phoneNumber,
                  designation: updatedEmployee.designation || emp.designation,
                  status: updatedEmployee.status
                    ? safeToLowerCase(updatedEmployee.status)
                    : emp.status,
                  technologies:
                    updatedEmployee.technologies || emp.technologies || [],
                  note: updatedEmployee.notes || emp.note || "",
                  // Safe array updates
                  phoneNumbers:
                    updatedEmployee.phoneNumbers || emp.phoneNumbers || [],
                  socialMedia:
                    updatedEmployee.socialMedia || emp.socialMedia || [],
                }
              : emp
          )
        )
      );

      setIsEditOpen(false);
      setCurrentEmployee(null);
      alert("Employee updated successfully!");
    } catch (err: any) {
      console.error("Update error details:", err);
      alert(`Error updating employee: ${err.message}`);
    }
  };

  // Filter & Search
  const searchFilteredEmployees = filteredEmployees.filter((employee) => {
    const matchesSearch =
      (employee.firstName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (employee.lastName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (employee.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (employee.uniqueId || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesDesignation =
      designationFilter === "all" ||
      (employee.designation || "")
        .toLowerCase()
        .includes(designationFilter.toLowerCase());

    return matchesSearch && matchesDesignation;
  });

  // Pagination
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedEmployees = searchFilteredEmployees.slice(
    startIndex,
    endIndex
  );
  const totalPages = Math.ceil(searchFilteredEmployees.length / rowsPerPage);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/employees">
              Employee
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>List</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Employee List</h1>
        <Button
          onClick={handleCreateEmployee}
          className="bg-accent hover:bg-accent/90 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Employee
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 border-b">
        <Button
          variant={currentFilter === "all" ? "default" : "ghost"}
          onClick={() => handleFilterChange("all")}
        >
          All
        </Button>
        <Button
          variant={currentFilter === "active" ? "default" : "ghost"}
          onClick={() => handleFilterChange("active")}
        >
          Active
        </Button>
        <Button
          variant={currentFilter === "Inactive" ? "default" : "ghost"}
          onClick={() => handleFilterChange("Inactive")}
        >
          Inactive
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex gap-4 items-center">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Designation</span>
            <Select
              value={designationFilter}
              onValueChange={setDesignationFilter}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="software engineer">
                  Software Engineer
                </SelectItem>
                <SelectItem value="senior developer">
                  Senior Developer
                </SelectItem>
                <SelectItem value="devops engineer">DevOps Engineer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="relative w-full sm:w-64 ml-auto">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Employee Table */}
      {loading ? (
        <p className="text-center py-12">Loading employees...</p>
      ) : (
        <div className="border rounded-lg">
          {paginatedEmployees.length === 0 ? (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No employees found</h3>
              <p className="text-muted-foreground">
                {searchTerm
                  ? "No employees match your search criteria."
                  : "No employees in this category."}
              </p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          selectedRows.length === paginatedEmployees.length &&
                          paginatedEmployees.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2 cursor-pointer">
                        Name
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Technologies</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedRows.includes(employee.id)}
                          onCheckedChange={() => handleRowSelect(employee.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-muted text-xs">
                              {getInitials(
                                employee.firstName,
                                employee.lastName
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">
                            {employee.firstName} {employee.lastName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{employee.phoneNumber}</TableCell>
                      <TableCell>{employee.designation}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {employee.technologies
                            ?.slice(0, 2)
                            .map((tech, index) => (
                              <span
                                key={index}
                                className="text-sm text-muted-foreground"
                              >
                                {tech}
                                {index <
                                employee.technologies.slice(0, 2).length - 1
                                  ? ","
                                  : ""}
                              </span>
                            ))}
                          {employee.technologies?.length > 2 && (
                            <span className="text-sm text-muted-foreground">
                              ...
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            employee.status === "active"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {employee.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEdit(employee)}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleView(employee)}
                            >
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDelete(employee.id)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-end space-x-2 p-4">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Employee - ID: {currentEmployee?.id}</DialogTitle>
          </DialogHeader>
          {currentEmployee && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name *</label>
                <Input
                  value={currentEmployee.firstName || ""}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name *</label>
                <Input
                  value={currentEmployee.lastName || ""}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email *</label>
                <Input
                  value={currentEmployee.email || ""}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number *</label>
                <Input
                  value={currentEmployee.phoneNumber || ""}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      phoneNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Designation *</label>
                <Input
                  value={currentEmployee.designation || ""}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      designation: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status *</label>
                <Select
                  value={currentEmployee.status || "active"}
                  onValueChange={(value) =>
                    setCurrentEmployee({ ...currentEmployee, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">
                  Technologies (comma separated)
                </label>
                <Input
                  value={currentEmployee.technologies?.join(", ") || ""}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      technologies: e.target.value
                        .split(",")
                        .map((tech) => tech.trim())
                        .filter((tech) => tech !== ""),
                    })
                  }
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => currentEmployee && handleSaveEdit(currentEmployee)}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
          </DialogHeader>
          {currentEmployee && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p>
                  <strong>ID:</strong> {currentEmployee.uniqueId}
                </p>
                <p>
                  <strong>Name:</strong> {currentEmployee.firstName}{" "}
                  {currentEmployee.middleName} {currentEmployee.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {currentEmployee.email}
                </p>
                <p>
                  <strong>Phone:</strong> {currentEmployee.phoneNumber}
                </p>
                <p>
                  <strong>Designation:</strong> {currentEmployee.designation}
                </p>
                <p>
                  <strong>Status:</strong> {currentEmployee.status}
                </p>
              </div>
              <div>
                <p>
                  <strong>Technologies:</strong>{" "}
                  {currentEmployee.technologies?.join(", ")}
                </p>
                <p>
                  <strong>Address:</strong> {currentEmployee.currentAddress}
                </p>
                <p>
                  <strong>Salary:</strong> ${currentEmployee.currentSalary}
                </p>
                <p>
                  <strong>Experience:</strong> {currentEmployee.totalExperience}{" "}
                  years
                </p>
                <p>
                  <strong>Date of Joining:</strong>{" "}
                  {new Date(currentEmployee.dateOfJoining).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Employees;
