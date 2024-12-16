'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  name: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier: {
    name: string;
    price: string;
  };
}

export default function PaymentModal({ isOpen, onClose, selectedTier }: PaymentModalProps) {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    name: '',
  })

  const [errors, setErrors] = useState<Partial<PaymentDetails>>({})

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setPaymentDetails(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentDetails> = {}

    if (!/^\d{16}$/.test(paymentDetails.cardNumber)) {
      newErrors.cardNumber = 'Card number must be 16 digits'
    }

    if (!/^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate)) {
      newErrors.expiryDate = 'Expiry date must be in MM/YY format'
    }

    if (!/^\d{3}$/.test(paymentDetails.cvc)) {
      newErrors.cvc = 'CVC must be 3 digits'
    }

    if (paymentDetails.name.trim().length === 0) {
      newErrors.name = 'Name is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Payment submitted:', paymentDetails)
      onClose()
    } else {
      console.log('Please correct the errors before submitting')
    }
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Complete Your Purchase</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <p className="mb-6">You're purchasing the <strong>{selectedTier.name}</strong> plan for <strong>{selectedTier.price}/month</strong></p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Cardholder Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={paymentDetails.name}
              onChange={handleInputChange}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={paymentDetails.cardNumber}
              onChange={handleInputChange}
              className={errors.cardNumber ? 'border-red-500' : ''}
            />
            {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                type="text"
                placeholder="MM/YY"
                value={paymentDetails.expiryDate}
                onChange={handleInputChange}
                className={errors.expiryDate ? 'border-red-500' : ''}
              />
              {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
            </div>
            <div className="flex-1">
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                name="cvc"
                type="text"
                placeholder="123"
                value={paymentDetails.cvc}
                onChange={handleInputChange}
                className={errors.cvc ? 'border-red-500' : ''}
              />
              {errors.cvc && <p className="text-red-500 text-sm mt-1">{errors.cvc}</p>}
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-green-500 hover:bg-green-600 text-white"
          >
            Pay {selectedTier.price}
          </Button>
        </form>
      </motion.div>
    </motion.div>
  )
}

