// "use client";
// import { useState } from 'react';
// import { toast } from 'sonner'; 

// export function WaitlistSignup() {
//   const [email, setEmail] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const response = await fetch('/api/waitlist', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success('Successfully joined waitlist!', {
//           description: 'We will notify you about early access.'
//         });
//         setEmail(''); // Clear input
//       } else {
//         toast.error('Error joining waitlist', {
//           description: data.error || 'Please try again'
//         });
//       }
//     } catch (error) {
//       toast.error('Network error', {
//         description: 'Please check your connection'
//       });
//       console.log("error:", error)
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="flex items-center border-2 border-[#4b9ec1] rounded-full overflow-hidden">
//         <input 
//           type="email" 
//           placeholder="Enter your email for early access" 
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           disabled={isSubmitting}
//           className="flex-grow px-4 py-3 text-gray-700 focus:outline-none"
//         />
//         <button 
//           type="submit" 
//           disabled={isSubmitting}
//           className="bg-[#4b9ec1] text-white px-6 py-3 hover:bg-blue-600 transition-colors disabled:opacity-50"
//         >
//           {isSubmitting ? 'Submitting...' : 'Notify Me'}
//         </button>
//       </div>
//     </form>
//   );
// }