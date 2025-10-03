"use client"
import Image from "next/image";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Navbar from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";

// Validation schema
const deliverySchema = Yup.object({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .required('Last name is required'),
  address: Yup.string()
    .min(5, 'Address must be at least 5 characters')
    .required('Address is required'),
  city: Yup.string()
    .min(2, 'City must be at least 2 characters')
    .required('City is required'),
  zipCode: Yup.string()
    .matches(/^\d{5}(-\d{4})?$/, 'Please enter a valid zip code')
    .required('Zip code is required'),
  mobileNumber: Yup.string()
    .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
    .required('Mobile number is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
});

export default function CheckoutPage() {
  const { state } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState<typeof initialValues | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const initialValues = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    mobileNumber: '',
    email: '',
  };

  const handleDeliverySubmit = (values: typeof initialValues) => {
    setFormValues(values);
  };

  const handlePayment = async () => {
    if (!formValues) {
      alert('Please fill in all delivery information');
      return;
    }

    if (state.items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsSubmitting(true);

    try {
      // Transform cart items to API format
      const products = state.items.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }));

      const payload = {
        products,
        deliveryInfo: {
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          address: formValues.address,
          cityOrTown: formValues.city,
          zipCode: formValues.zipCode,
          phone: formValues.mobileNumber,
          email: formValues.email
        }
      };

      const response = await fetch('https://babagang.onrender.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const result = await response.json();

      if (result.status && result.paymentUrl) {
        // Open payment URL in new tab
        window.open(result.paymentUrl, '_blank');
      } else {
        throw new Error('Payment URL not received');
      }

    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to process payment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some items to get started</p>
            <Link
              href="/"
              className="bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-6 pt-24">
        <div className="flex items-center text-sm text-gray-500 space-x-2">
          <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-gray-700 transition-colors">Black Pill</Link>
          <span>/</span>
          <span className="text-gray-900">Checkout</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          <div className="lg:col-span-7">
            {/* My Cart Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-semibold text-gray-900">My Cart</h2>
                <span className="bg-black text-white text-sm px-2.5 py-0.5 rounded-full">{state.itemCount}</span>
              </div>

              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-20 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={75}
                          className="object-contain"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500 mb-1">Color: Black</p>
                        <p className="text-sm text-gray-500">Size: {item.size}</p>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Information Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Delivery Information</h2>

              <Formik
                initialValues={initialValues}
                validationSchema={deliverySchema}
                onSubmit={handleDeliverySubmit}
                validateOnChange={true}
                validateOnBlur={true}
              >
                {({ errors, touched, values, isValid, dirty }) => {
                  // Update formValues and validity state whenever form changes
                  if (isValid && dirty) {
                    if (JSON.stringify(values) !== JSON.stringify(formValues)) {
                      setFormValues(values);
                    }
                    if (!isFormValid) {
                      setIsFormValid(true);
                    }
                  } else {
                    if (isFormValid) {
                      setIsFormValid(false);
                    }
                    if (formValues !== null) {
                      setFormValues(null);
                    }
                  }

                  return (
                  <Form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm text-gray-700 mb-2">
                          First Name
                        </label>
                        <Field
                          name="firstName"
                          type="text"
                          placeholder="Enter your first name"
                          className={`w-full px-3 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-1 ${errors.firstName && touched.firstName
                              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                            }`}
                        />
                        <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs mt-1" />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm text-gray-700 mb-2">
                          Last Name
                        </label>
                        <Field
                          name="lastName"
                          type="text"
                          placeholder="Enter your last name"
                          className={`w-full px-3 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-1 ${errors.lastName && touched.lastName
                              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                            }`}
                        />
                        <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs mt-1" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm text-gray-700 mb-2">
                        Address
                      </label>
                      <Field
                        name="address"
                        type="text"
                        placeholder="Enter your full address"
                        className={`w-full px-3 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-1 ${errors.address && touched.address
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                          }`}
                      />
                      <ErrorMessage name="address" component="div" className="text-red-500 text-xs mt-1" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm text-gray-700 mb-2">
                          City/Town
                        </label>
                        <Field
                          name="city"
                          type="text"
                          placeholder="Enter your city"
                          className={`w-full px-3 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-1 ${errors.city && touched.city
                              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                            }`}
                        />
                        <ErrorMessage name="city" component="div" className="text-red-500 text-xs mt-1" />
                      </div>
                      <div>
                        <label htmlFor="zipCode" className="block text-sm text-gray-700 mb-2">
                          Zip Code
                        </label>
                        <Field
                          name="zipCode"
                          type="text"
                          placeholder="12345"
                          className={`w-full px-3 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-1 ${errors.zipCode && touched.zipCode
                              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                            }`}
                        />
                        <ErrorMessage name="zipCode" component="div" className="text-red-500 text-xs mt-1" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="mobileNumber" className="block text-sm text-gray-700 mb-2">
                          Mobile Number
                        </label>
                        <Field
                          name="mobileNumber"
                          type="text"
                          placeholder="+1234567890"
                          className={`w-full px-3 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-1 ${errors.mobileNumber && touched.mobileNumber
                              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                            }`}
                        />
                        <ErrorMessage name="mobileNumber" component="div" className="text-red-500 text-xs mt-1" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                          Email address
                        </label>
                        <Field
                          name="email"
                          type="email"
                          placeholder="example@email.com"
                          className={`w-full px-3 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-1 ${errors.email && touched.email
                              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                            }`}
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                      </div>
                    </div>

                    {/* Optional: Submit button for form testing */}
                    {/* <button type="submit" className="hidden">Submit</button> */}
                  </Form>
                  );
                }}
              </Formik>
            </div>

          </div>

          {/* Payment Information Section */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Information</h2>

            {/* Apply Discount */}
            <div className="mb-6">
              <label className="block text-sm text-gray-700 mb-2">Apply Discount</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="bg-black text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                  Apply
                </button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-8">
              <label className="block text-sm text-gray-700 mb-3">Pay With</label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    checked={paymentMethod === "stripe"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-black focus:ring-black border-gray-300"
                  />
                  <span className="text-sm text-gray-900">Stripe</span>
                </label>
                {/* <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="paystack"
                    checked={paymentMethod === "paystack"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-black focus:ring-black border-gray-300"
                  />
                  <span className="text-sm text-gray-900">Paystack</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="flutterwave"
                    checked={paymentMethod === "flutterwave"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-black focus:ring-black border-gray-300"
                  />
                  <span className="text-sm text-gray-900">Flutterwave</span>
                </label> */}
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sub Total</span>
                <span className="text-gray-900">${state.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">$0.00</span>
              </div>
              <hr className="border-gray-200 my-3" />
              <div className="flex justify-between font-semibold">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${state.total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={isSubmitting || !isFormValid}
              className="w-full bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : `Pay $${state.total.toFixed(2)}`}
            </button>
            {!isFormValid && (
              <p className="text-xs text-gray-500 text-center mt-2">
                Please complete the delivery information form to proceed
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}