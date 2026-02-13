
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, ShoppingBag } from 'lucide-react';
import { useAppSelector } from '../app/hooks';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { totalQuantity } = useAppSelector((state) => state.cart);
    const location = useLocation();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-6">
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="container mx-auto max-w-6xl"
            >
                <div className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl shadow-blue-500/5 rounded-3xl px-6 py-4 flex justify-between items-center transition-all duration-500">
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                            <ShoppingBag className="text-white h-5 w-5" />
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">
                            ShopStyle
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className={`text-sm font-semibold transition-colors duration-300 ${location.pathname === '/' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}>
                            Products
                        </Link>
                        <Link to="/cart" className={`text-sm font-semibold transition-colors duration-300 ${location.pathname === '/cart' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}>
                            Story
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link to="/cart" className="relative p-2 rounded-2xl hover:bg-blue-50 transition-all duration-300 group">
                            <ShoppingCart className="text-gray-700 group-hover:text-blue-600 h-6 w-6 transition-colors" />
                            <AnimatePresence>
                                {totalQuantity > 0 && (
                                    <motion.span
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow-lg shadow-blue-500/30"
                                    >
                                        {totalQuantity}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </nav>
    );
};

export default Navbar;
