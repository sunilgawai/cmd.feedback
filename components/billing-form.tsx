'use client'

import { useState } from "react"

export function BillingForm() {
  const [loading, setLoading] = useState(false)

  const onPortalClick = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/stripe/create-portal', {
        method: 'POST',
      })
      const data = await response.json()
      window.location.href = data.url
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-lg border p-4">
      <h3 className="text-lg font-medium mb-4">Manage your subscription</h3>
      <button
        onClick={onPortalClick}
        disabled={loading}
        className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Open customer portal'}
      </button>
    </div>
  )
}
