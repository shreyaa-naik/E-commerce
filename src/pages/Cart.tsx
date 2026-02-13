
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { removeFromCart, updateQuantity, clearCart } from '../features/cartSlice';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
    const { items, totalPrice, totalQuantity } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    if (items.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-32 max-w-lg mx-auto"
            >
                <div className="relative w-32 h-32 mx-auto mb-8 bg-blue-50 rounded-[2.5rem] flex items-center justify-center border border-blue-100">
                    <ShoppingBag className="h-14 w-14 text-blue-600" />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -top-2 -right-2 h-8 w-8 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-600 font-black text-sm"
                    >
                        ?
                    </motion.div>
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Your Cart is Empty</h2>
                <p className="text-gray-500 font-medium mb-10">Discover our curated collection and find your next statement piece.</p>
                <Link to="/" className="bg-gray-900 text-white px-10 py-5 rounded-[2rem] font-black hover:bg-blue-600 transition-all duration-300 shadow-xl shadow-gray-200 hover:shadow-blue-500/20 active:scale-95 inline-block">
                    Explore Collection
                </Link>
            </motion.div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mb-12"
            >
                <h1 className="text-5xl font-black text-gray-900 tracking-tighter">Your <span className="text-blue-600">Bag.</span></h1>
                <div className="flex items-center space-x-2 text-gray-400 font-black uppercase text-[10px] tracking-widest">
                    <span>{totalQuantity} Items</span>
                    <div className="h-1 w-1 rounded-full bg-gray-300"></div>
                    <span>Free Shipping</span>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2">
                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="group bg-white rounded-[2.5rem] p-6 flex flex-col sm:flex-row items-center gap-8 border border-white shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500"
                                >
                                    <div className="relative w-32 h-32 flex-shrink-0 bg-gray-50 rounded-[2rem] overflow-hidden p-2 group-hover:scale-105 transition-transform duration-500">
                                        <img
                                            src={item.images[0]?.replace('["', '').replace('"]', '') || "https://placehold.co/200"}
                                            alt={item.title}
                                            className="w-full h-full object-cover rounded-[1.5rem]"
                                        />
                                    </div>

                                    <div className="flex-grow text-center sm:text-left">
                                        <Link to={`/product/${item.id}`} className="text-xl font-black text-gray-900 hover:text-blue-600 transition-colors tracking-tight">
                                            {item.title}
                                        </Link>
                                        <p className="text-gray-400 text-xs font-black uppercase tracking-widest mt-2">{item.category?.name || 'Essential'}</p>
                                        <p className="text-blue-600 font-black mt-1">${item.price}</p>
                                    </div>

                                    <div className="flex items-center space-x-8">
                                        <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
                                            <button
                                                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                                                className="p-3 hover:bg-white hover:shadow-sm rounded-xl text-gray-400 hover:text-gray-900 transition-all active:scale-90"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="w-12 text-center font-black text-gray-900 text-lg">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                                                className="p-3 hover:bg-white hover:shadow-sm rounded-xl text-gray-400 hover:text-gray-900 transition-all active:scale-90"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>

                                        <div className="w-24 text-right">
                                            <p className="text-xl font-black text-gray-900 tracking-tight">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>

                                        <button
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                            className="text-gray-300 hover:text-red-500 p-2 transition-colors duration-300"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        whileHover={{ opacity: 1 }}
                        onClick={() => dispatch(clearCart())}
                        className="mt-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] hover:text-red-600 transition-colors pl-6"
                    >
                        Reset Whole Bag
                    </motion.button>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-1"
                >
                    <div className="bg-gray-900 text-white rounded-[3rem] p-10 shadow-2xl shadow-gray-900/10 sticky top-32 border border-gray-800">
                        <h2 className="text-2xl font-black mb-10 tracking-tight flex items-center">
                            Checkout <CreditCard className="ml-3 h-5 w-5 text-blue-400" />
                        </h2>

                        <div className="space-y-6 mb-12">
                            <div className="flex justify-between text-gray-400 font-bold text-sm tracking-tight">
                                <span>Items Subtotal</span>
                                <span className="text-white">${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400 font-bold text-sm tracking-tight">
                                <span>Protection & Tax</span>
                                <span className="text-white">${(totalPrice * 0.1).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400 font-bold text-sm tracking-tight">
                                <span>Priority Logistics</span>
                                <span className="text-green-400 font-black uppercase text-[10px] tracking-widest">Complimentary</span>
                            </div>
                            <div className="pt-8 border-t border-gray-800 flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-1">Total Balance</p>
                                    <p className="text-4xl font-black text-white tracking-tighter leading-none">${(totalPrice * 1.1).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>

                        <button className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all duration-300 shadow-xl shadow-blue-500/20 active:scale-95 flex items-center justify-center group">
                            Complete Order <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <p className="text-center text-[10px] text-gray-500 mt-6 font-bold uppercase tracking-widest">Encrypted & Secure Transaction</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Cart;
