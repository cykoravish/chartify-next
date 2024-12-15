"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

export function JoinWaitingList({ setSubmitted }) {
  const [open, setOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const response = await fetch("/api/earlyuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }

      setSubmitted(true);

      // Reset form and close dialog
      setName("");
      setEmail("");
      setOpen(false);
      toast.success("Successfully joined the waiting list!", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      toast.error("can't join waiting list. sorry for inconven");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-green-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-500 font-semibold text-sm sm:text-base whitespace-nowrap"
          //   type="submit"
          disabled={loading}
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Join Waiting List"
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-green-600 text-lg">
            Join the waiting list
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-800">
            Please provide your name and email so that we can notify you about
            the updates.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="title"
                className="text-right text-gray-900 font-semibold"
              >
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3 text-sm placeholder:text-sm placeholder:text-gray-400"
                placeholder="Ravish"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="description"
                className="text-right text-gray-900 font-semibold"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3 text-sm placeholder:text-sm placeholder:text-gray-400"
                placeholder="ravishbisht86@gmail.com"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="bg-green-600 text-white px-6 py-4 rounded-md shadow-md hover:bg-green-500 text-sm sm:text-base whitespace-nowrap"
              disabled={loading}
            >
              {loading ? <LoaderCircle className="animate-spin" /> : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
