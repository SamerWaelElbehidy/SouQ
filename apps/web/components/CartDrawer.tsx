'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import { CloseIcon, TrashIcon, PlusIcon, MinusIcon } from '@/components/Icons';
import Link from 'next/link';

export default function CartDrawer() {
  const { items, isOpen, toggleCartOpen, removeItem, updateQuantity } = useCartStore();

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={toggleCartOpen}
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 38 }}
            className="fixed top-0 end-0 bottom-0 z-[60] w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
              <h2 className="text-xl font-black text-navy">سلة المشتريات</h2>
              <motion.button
                onClick={toggleCartOpen}
                className="p-1.5 rounded-lg text-gray-400 hover:text-navy hover:bg-gray-100 transition-colors"
                whileTap={{ scale: 0.88 }}
                aria-label="إغلاق"
              >
                <CloseIcon size={20} />
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 px-6 py-4 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <TrashIcon size={32} className="text-gray-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">السلة فارغة</h3>
                  <p className="text-gray-500 mb-6 text-sm">لم تقم بإضافة أي منتجات إلى سلة المشتريات بعد.</p>
                  <button
                    onClick={toggleCartOpen}
                    className="px-6 py-3 rounded-xl font-bold bg-navy text-white hover:bg-black transition-colors"
                  >
                    مواصلة التسوق
                  </button>
                </div>
              ) : (
                <ul className="flex flex-col gap-6">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      {/* Product Image placeholder */}
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-teal/20 to-navy/20 shrink-0 border border-gray-100">
                         {item.image && (
                            <Image src={item.image} alt={item.title} width={80} height={80} className="rounded-xl object-cover" />
                         )}
                      </div>
                      
                      {/* Details */}
                      <div className="flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex items-start justify-between">
                            <h4 className="text-[13.5px] font-bold text-navy leading-snug line-clamp-2">
                              {item.title}
                            </h4>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              aria-label="إزالة"
                            >
                              <TrashIcon size={16} />
                            </button>
                          </div>
                          <p className="text-teal font-bold text-sm mt-1">${item.price.toFixed(2)}</p>
                        </div>
                        
                        {/* Quantity */}
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                          >
                            <MinusIcon size={14} />
                          </button>
                          <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                          >
                            <PlusIcon size={14} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-gray-100 bg-gray-50/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500 font-medium">المجموع</span>
                  <span className="text-xl font-black text-navy">${subtotal.toFixed(2)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={toggleCartOpen}
                  className="block w-full py-4 text-center rounded-xl font-bold bg-teal text-white hover:bg-[#0f6b5a] transition-all duration-200 shadow-[0_4px_20px_rgba(23,143,122,0.3)] hover:shadow-[0_4px_20px_rgba(23,143,122,0.5)] active:scale-[0.98]"
                >
                  إتمام الطلب
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
