// // components/AdminGenerateLink.jsx
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Copy, Link, UserPlus, Check, RefreshCw } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// const AdminGenerateLink = () => {
//   const { toast } = useToast();
//   const [loading, setLoading] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [generatedData, setGeneratedData] = useState(null);
  
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: ""
//   });

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const generateEmployeeLink = async () => {
//     // Basic validation
//     if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
//       toast({
//         variant: "destructive",
//         title: "Validation Error",
//         description: "Please fill in all fields before generating link."
//       });
//       return;
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       toast({
//         variant: "destructive",
//         title: "Invalid Email",
//         description: "Please enter a valid email address."
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch("http://localhost:5000/api/employees/admin-create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           firstName: formData.firstName.trim(),
//           lastName: formData.lastName.trim(),
//           email: formData.email.trim()
//         })
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Failed to generate employee link");
//       }

//       if (result.success) {
//         const employeeLink = `http://localhost:8080/employee-form/${result.employee.employeeId}`;
        
//         setGeneratedData({
//           employeeId: result.employee.employeeId,
//           link: employeeLink,
//           employeeName: `${result.employee.firstName} ${result.employee.lastName}`,
//           email: result.employee.email
//         });

//         // Auto-copy to clipboard
//         await copyToClipboard(employeeLink);

//         toast({
//           title: "✅ Link Generated Successfully!",
//           description: "Registration link has been copied to clipboard.",
//           duration: 3000,
//         });
//       }
//     } catch (error) {
//       console.error("Error generating link:", error);
//       toast({
//         variant: "destructive",
//         title: "Generation Failed",
//         description: error.message || "Failed to generate employee link. Please try again."
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const copyToClipboard = async (text = null) => {
//     const textToCopy = text || generatedData?.link;
    
//     try {
//       await navigator.clipboard.writeText(textToCopy);
//       setCopied(true);
      
//       toast({
//         title: "📋 Copied to Clipboard!",
//         description: "Registration link has been copied.",
//         duration: 2000,
//       });

//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       // Fallback for older browsers
//       const textArea = document.createElement("textarea");
//       textArea.value = textToCopy;
//       document.body.appendChild(textArea);
//       textArea.select();
//       document.execCommand("copy");
//       document.body.removeChild(textArea);
      
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       firstName: "",
//       lastName: "",
//       email: ""
//     });
//     setGeneratedData(null);
//     setCopied(false);
//   };

//   const generateAnother = () => {
//     setGeneratedData(null);
//     setCopied(false);
//     setFormData({
//       firstName: "",
//       lastName: "",
//       email: ""
//     });
//   };

//   return (
//     <div className="min-h-screen bg-white p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-orange-800 mb-3 flex items-center justify-center gap-3">
//             <UserPlus className="h-10 w-10 text-orange-800" />
//             Employee Registration Portal
//           </h1>
//           <p className="text-xl text-orange-800 max-w-2xl mx-auto">
//             Generate secure registration links for new employees to complete their profiles
//           </p>
//         </div>

//         <div className="grid gap-8 lg:grid-cols-2">
//           {/* Left Side - Input Form */}
//           <Card className="bg-white/95 backdrop-blur-sm border-orange-200 shadow-2xl">
//             <CardHeader className="pb-4">
//               <CardTitle className="text-2xl flex items-center gap-2 text-orange-800">
//                 <Link className="h-6 w-6" />
//                 Generate Registration Link
//               </CardTitle>
//               <CardDescription className="text-base text-gray-600">
//                 Enter employee basic details to create a personalized registration link
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {/* Form Fields */}
//               <div className="space-y-4">
//                 <div className="space-y-3">
//                   <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700">
//                     First Name <span className="text-red-500">*</span>
//                   </Label>
//                   <Input
//                     id="firstName"
//                     placeholder="Enter first name"
//                     value={formData.firstName}
//                     onChange={(e) => handleInputChange("firstName", e.target.value)}
//                     className="h-12 text-lg border-orange-300 focus:border-orange-500 focus:ring-orange-500"
//                     disabled={loading}
//                   />
//                 </div>

//                 <div className="space-y-3">
//                   <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700">
//                     Last Name <span className="text-red-500">*</span>
//                   </Label>
//                   <Input
//                     id="lastName"
//                     placeholder="Enter last name"
//                     value={formData.lastName}
//                     onChange={(e) => handleInputChange("lastName", e.target.value)}
//                     className="h-12 text-lg border-orange-300 focus:border-orange-500 focus:ring-orange-500"
//                     disabled={loading}
//                   />
//                 </div>

//                 <div className="space-y-3">
//                   <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
//                     Email Address <span className="text-red-500">*</span>
//                   </Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="employee@company.com"
//                     value={formData.email}
//                     onChange={(e) => handleInputChange("email", e.target.value)}
//                     className="h-12 text-lg border-orange-300 focus:border-orange-500 focus:ring-orange-500"
//                     disabled={loading}
//                   />
//                 </div>
//               </div>

//               {/* Generate Button */}
//               <Button
//                 onClick={generateEmployeeLink}
//                 disabled={loading || !formData.firstName || !formData.lastName || !formData.email}
//                 className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 shadow-lg transition-all duration-300 text-white"
//               >
//                 {loading ? (
//                   <>
//                     <RefreshCw className="h-5 w-5 animate-spin mr-2" />
//                     Generating Link...
//                   </>
//                 ) : (
//                   <>
//                     <Link className="h-5 w-5 mr-2" />
//                     Generate Registration Link
//                   </>
//                 )}
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Right Side - Generated Link Display */}
//           <Card className="bg-white/95 backdrop-blur-sm border-orange-300 shadow-2xl">
//             <CardHeader className="pb-4">
//               <CardTitle className="text-2xl flex items-center gap-2 text-orange-800">
//                 <Check className="h-6 w-6" />
//                 Registration Link
//               </CardTitle>
//               <CardDescription className="text-base text-gray-600">
//                 {generatedData 
//                   ? "Share this link with the employee" 
//                   : "Link will appear here after generation"
//                 }
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {generatedData ? (
//                 <>
//                   {/* Employee Summary */}
//                   <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
//                     <div className="flex items-center justify-between mb-3">
//                       <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">
//                         Employee ID: {generatedData.employeeId}
//                       </Badge>
//                       <Badge className="bg-green-100 text-green-800 border-green-200">
//                         Ready to Share
//                       </Badge>
//                     </div>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <span className="font-semibold text-gray-700">Name:</span>
//                         <span className="text-gray-900">{generatedData.employeeName}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="font-semibold text-gray-700">Email:</span>
//                         <span className="text-gray-900">{generatedData.email}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Generated Link */}
//                   <div className="space-y-3">
//                     <Label className="text-sm font-semibold text-gray-700">
//                       Registration Link
//                     </Label>
//                     <div className="flex gap-2">
//                       <div className="flex-1 bg-gray-100 border border-gray-300 rounded-lg p-3 break-all text-sm font-mono text-gray-800">
//                         {generatedData.link}
//                       </div>
//                       <Button
//                         onClick={() => copyToClipboard()}
//                         variant="outline"
//                         className="flex-shrink-0 border-orange-300 hover:bg-orange-50"
//                         disabled={copied}
//                       >
//                         {copied ? (
//                           <Check className="h-4 w-4 text-green-600" />
//                         ) : (
//                           <Copy className="h-4 w-4" />
//                         )}
//                       </Button>
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex gap-3 pt-4">
//                     <Button
//                       onClick={generateAnother}
//                       variant="outline"
//                       className="flex-1 border-orange-300 text-orange-700 hover:bg-orange-50"
//                     >
//                       <UserPlus className="h-4 w-4 mr-2" />
//                       Generate Another
//                     </Button>
//                     <Button
//                       onClick={() => copyToClipboard()}
//                       className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
//                       disabled={copied}
//                     >
//                       {copied ? (
//                         <>
//                           <Check className="h-4 w-4 mr-2" />
//                           Copied!
//                         </>
//                       ) : (
//                         <>
//                           <Copy className="h-4 w-4 mr-2" />
//                           Copy Again
//                         </>
//                       )}
//                     </Button>
//                   </div>

//                   {/* Instructions */}
//                   <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
//                     <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
//                       📤 Ready to Share
//                     </h4>
//                     <ul className="text-sm text-orange-700 space-y-1">
//                       <li>• Link is already copied to clipboard</li>
//                       <li>• Paste it in an email or chat to the employee</li>
//                       <li>• Employee can click link to complete registration</li>
//                       <li>• Link expires after registration is completed</li>
//                     </ul>
//                   </div>
//                 </>
//               ) : (
//                 /* Empty State */
//                 <div className="text-center py-12">
//                   <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
//                     <Link className="h-8 w-8 text-orange-400" />
//                   </div>
//                   <h3 className="text-lg font-semibold text-gray-500 mb-2">
//                     No Link Generated Yet
//                   </h3>
//                   <p className="text-gray-400 text-sm">
//                     Fill in the employee details and click "Generate Registration Link"
//                   </p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Footer Stats */}
//         {generatedData && (
//           <div className="mt-8 text-center">
//             <div className="inline-flex items-center gap-6 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 border border-orange-200 shadow-lg">
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-orange-600">1</div>
//                 <div className="text-sm text-gray-600">Link Generated</div>
//               </div>
//               <div className="w-px h-12 bg-orange-200"></div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-green-600">Active</div>
//                 <div className="text-sm text-gray-600">Status</div>
//               </div>
//               <div className="w-px h-12 bg-orange-200"></div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-orange-600">{generatedData.employeeId}</div>
//                 <div className="text-sm text-gray-600">Employee ID</div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminGenerateLink;








// components/AdminGenerateLink.jsx
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Copy, Link, UserPlus, Check, RefreshCw } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// const AdminGenerateLink = () => {
//   const { toast } = useToast();
//   const [loading, setLoading] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [generatedData, setGeneratedData] = useState(null);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: ""
//   });

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   // Generate a random employeeId (or use backend later)
//   const generateEmployeeId = () => {
//     return "EMP" + Date.now();
//   };

//   const generateEmployeeLink = async () => {
//     if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
//       toast({
//         variant: "destructive",
//         title: "Validation Error",
//         description: "Please fill in all fields before generating link."
//       });
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       toast({
//         variant: "destructive",
//         title: "Invalid Email",
//         description: "Please enter a valid email address."
//       });
//       return;
//     }

//     setLoading(true);
//     const employeeId = generateEmployeeId();
//     const employeeLink = `http://localhost:8080/employee-form/${employeeId}`;

//     try {
//       // ✅ Call your email API
//       const response = await fetch("http://localhost:5000/api/email/send-email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           to: formData.email,
//           subject: "Employee Registration Link",
//           text: `Hello ${formData.firstName},\n\nPlease complete your registration using the link below:\n${employeeLink}\n\nRegards,\nOctopus HR`
//         })
//       });

//       const result = await response.json();
//       if (!response.ok) throw new Error(result.message || "Failed to send email");

//       setGeneratedData({
//         employeeId,
//         link: employeeLink,
//         employeeName: `${formData.firstName} ${formData.lastName}`,
//         email: formData.email
//       });

//       await copyToClipboard(employeeLink);

//       toast({
//         title: "✅ Email Sent Successfully!",
//         description: "Registration link has been emailed and copied to clipboard.",
//         duration: 3000,
//       });

//     } catch (error) {
//       console.error("Error sending email:", error);
//       toast({
//         variant: "destructive",
//         title: "Failed",
//         description: error.message || "Could not send email. Try again."
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const copyToClipboard = async (text = null) => {
//     const textToCopy = text || generatedData?.link;
//     try {
//       await navigator.clipboard.writeText(textToCopy);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       const textArea = document.createElement("textarea");
//       textArea.value = textToCopy;
//       document.body.appendChild(textArea);
//       textArea.select();
//       document.execCommand("copy");
//       document.body.removeChild(textArea);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   const generateAnother = () => {
//     setGeneratedData(null);
//     setCopied(false);
//     setFormData({ firstName: "", lastName: "", email: "" });
//   };

//   return (
//     <div className="min-h-screen bg-white p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-orange-800 mb-3 flex items-center justify-center gap-3">
//             <UserPlus className="h-10 w-10 text-orange-800" />
//             Employee Registration Portal
//           </h1>
//           <p className="text-xl text-orange-800">
//             Generate and email secure registration links for new employees
//           </p>
//         </div>

//         <div className="grid gap-8 lg:grid-cols-2">
//           {/* Left - Input Form */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Generate Registration Link</CardTitle>
//               <CardDescription>Enter employee details</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-3">
//                 <Label>First Name *</Label>
//                 <Input
//                   value={formData.firstName}
//                   onChange={(e) => handleInputChange("firstName", e.target.value)}
//                   disabled={loading}
//                 />
//               </div>
//               <div className="space-y-3">
//                 <Label>Last Name *</Label>
//                 <Input
//                   value={formData.lastName}
//                   onChange={(e) => handleInputChange("lastName", e.target.value)}
//                   disabled={loading}
//                 />
//               </div>
//               <div className="space-y-3">
//                 <Label>Email *</Label>
//                 <Input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => handleInputChange("email", e.target.value)}
//                   disabled={loading}
//                 />
//               </div>
//               <Button onClick={generateEmployeeLink} disabled={loading}>
//                 {loading ? (
//                   <><RefreshCw className="h-5 w-5 animate-spin mr-2" />Sending...</>
//                 ) : (
//                   <><Link className="h-5 w-5 mr-2" />Send Registration Email</>
//                 )}
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Right - Show Link */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Registration Link</CardTitle>
//               <CardDescription>{generatedData ? "Email sent" : "Generate first"}</CardDescription>
//             </CardHeader>
//             <CardContent>
//               {generatedData ? (
//                 <div className="space-y-4">
//                   <Badge>Employee ID: {generatedData.employeeId}</Badge>
//                   <div className="flex gap-2">
//                     <div className="flex-1 bg-gray-100 p-2 rounded">{generatedData.link}</div>
//                     <Button onClick={() => copyToClipboard()} disabled={copied}>
//                       {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
//                     </Button>
//                   </div>
//                   <Button onClick={generateAnother} variant="outline">Generate Another</Button>
//                 </div>
//               ) : (
//                 <p>No link generated yet</p>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminGenerateLink;




// components/AdminGenerateLink.jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Link, UserPlus, Check, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminGenerateLink = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedData, setGeneratedData] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // 🔗 Fixed employee creation link
  const EMPLOYEE_CREATION_LINK = "http://localhost:8080/dashboard/employees/create";

  const generateEmployeeLink = async () => {
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all fields before generating link."
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Please enter a valid email address."
      });
      return;
    }

    setLoading(true);

    try {
      // ✅ Call your email API
      const response = await fetch("http://localhost:5000/api/email/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: formData.email,
          subject: "Employee Creation Access",
          text: `Hello ${formData.firstName},\n\nPlease use the following link to create a new employee:\n${EMPLOYEE_CREATION_LINK}\n\nRegards,\nOctopus HR Team`
        })
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to send email");

      setGeneratedData({
        link: EMPLOYEE_CREATION_LINK,
        employeeName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email
      });

      await copyToClipboard(EMPLOYEE_CREATION_LINK);

      toast({
        title: "✅ Email Sent Successfully!",
        description: "Link has been emailed and copied to clipboard.",
        duration: 3000,
      });

    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        variant: "destructive",
        title: "Failed",
        description: error.message || "Could not send email. Try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text = null) => {
    const textToCopy = text || generatedData?.link;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const generateAnother = () => {
    setGeneratedData(null);
    setCopied(false);
    setFormData({ firstName: "", lastName: "", email: "" });
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-800 mb-3 flex items-center justify-center gap-3">
            <UserPlus className="h-10 w-10 text-orange-800" />
            Employee Registration Portal
          </h1>
          <p className="text-xl text-orange-800">
            Generate and email employee creation link
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left - Input Form */}
          <Card className="bg-white border-orange-200 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl flex items-center gap-2 text-orange-800">
                <Link className="h-6 w-6" />
                Send Employee Creation Link
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                Enter recipient details to send registration email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="h-12 text-lg border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                    disabled={loading}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="h-12 text-lg border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                    disabled={loading}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="employee@company.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="h-12 text-lg border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                    disabled={loading}
                  />
                </div>
              </div>

              <Button
                onClick={generateEmployeeLink}
                disabled={loading || !formData.firstName || !formData.lastName || !formData.email}
                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 shadow-lg transition-all duration-300 text-white"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                    Sending Email...
                  </>
                ) : (
                  <>
                    <Link className="h-5 w-5 mr-2" />
                    Send Email
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Right - Show Link */}
          <Card className="bg-white border-orange-300 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl flex items-center gap-2 text-orange-800">
                <Check className="h-6 w-6" />
                Creation Link
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                {generatedData ? "Email sent successfully" : "Link will appear here after generation"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {generatedData ? (
                <>
                  {/* Employee Summary */}
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                        Recipient: {generatedData.employeeName}
                      </Badge>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Email Sent
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">Email:</span>
                        <span className="text-gray-900">{generatedData.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Generated Link */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700">
                      Registration Link
                    </Label>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-gray-100 border border-gray-300 rounded-lg p-3 break-all text-sm font-mono text-gray-800">
                        {generatedData.link}
                      </div>
                      <Button
                        onClick={() => copyToClipboard()}
                        variant="outline"
                        className="flex-shrink-0 border-orange-300 hover:bg-orange-50"
                        disabled={copied}
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={generateAnother}
                      variant="outline"
                      className="flex-1 border-orange-300 text-orange-700 hover:bg-orange-50"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Generate Another
                    </Button>
                    <Button
                      onClick={() => copyToClipboard()}
                      className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                      disabled={copied}
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Again
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Instructions */}
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                      📤 Email Sent Successfully
                    </h4>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• Link has been sent to {generatedData.email}</li>
                      <li>• Link is also copied to clipboard</li>
                      <li>• Employee can click link to complete registration</li>
                    </ul>
                  </div>
                </>
              ) : (
                /* Empty State */
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                    <Link className="h-8 w-8 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-500 mb-2">
                    No Link Generated Yet
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Fill in the employee details and click "Send Email"
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer Stats */}
        {generatedData && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-6 bg-white rounded-2xl px-6 py-4 border border-orange-200 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">1</div>
                <div className="text-sm text-gray-600">Email Sent</div>
              </div>
              <div className="w-px h-12 bg-orange-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">Active</div>
                <div className="text-sm text-gray-600">Status</div>
              </div>
              <div className="w-px h-12 bg-orange-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{generatedData.employeeName}</div>
                <div className="text-sm text-gray-600">Recipient</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGenerateLink;