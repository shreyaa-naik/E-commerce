
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts, type Product } from '../features/productSlice';
import { addToCart } from '../features/cartSlice';
import { motion } from 'framer-motion';
import { Plus, Star } from 'lucide-react';

const ProductList = () => {
    const dispatch = useAppDispatch();
    const { items, status, error } = useAppSelector((state) => state.products);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    const handleAddToCart = (e: React.MouseEvent, product: Product) => {
        e.preventDefault();
        dispatch(addToCart(product));
    };

    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="relative w-16 h-16">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-100 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                </div>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className="text-center py-20 bg-red-50 rounded-3xl border border-red-100 max-w-2xl mx-auto">
                <p className="text-red-600 font-medium">Unable to load products: {error}</p>
                <button onClick={() => dispatch(fetchProducts())} className="mt-4 text-sm font-bold text-red-700 hover:underline">Try Again</button>
            </div>
        );
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3"
                    >
                        Spring Collection 2026
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-5xl font-black text-gray-900 tracking-tight"
                    >
                        Elevate Your <span className="text-blue-600">Style.</span>
                    </motion.h1>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex space-x-2"
                >
                    <span className="px-4 py-2 bg-white rounded-full text-xs font-bold border border-gray-100 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">Popular</span>
                    <span className="px-4 py-2 bg-white rounded-full text-xs font-bold border border-gray-100 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">New Arrival</span>
                </motion.div>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12"
            >
                {items.map((product) => (
                    <motion.div
                        key={product.id}
                        variants={item}
                        className="group relative"
                    >
                        <Link to={`/product/${product.id}`} className="block">
                            <div className="relative aspect-[4/5] bg-gray-100 rounded-[2.5rem] overflow-hidden mb-6 group-hover:shadow-2xl group-hover:shadow-blue-500/10 transition-all duration-500">
                                <img
                                    src={product.images[0]?.replace('["', '').replace('"]', '') || "https://placehold.co/400x500"}
                                    alt={product.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "https://placehold.co/400x500";
                                    }}
                                />
                                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center space-x-1 shadow-sm">
                                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                    <span className="text-[10px] font-black text-gray-900">4.8</span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <button
                                    onClick={(e) => handleAddToCart(e, product)}
                                    className="absolute bottom-6 right-6 bg-white text-gray-900 h-14 w-14 rounded-2xl flex items-center justify-center shadow-xl transform translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-blue-600 hover:text-white"
                                >
                                    <Plus className="h-6 w-6 font-bold" />
                                </button>
                            </div>

                            <div className="px-2">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 truncate pr-4">
                                        {product.title}
                                    </h3>
                                    <span className="text-lg font-black text-blue-600">${product.price}</span>
                                </div>
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{product.category?.name || 'Essential'}</p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default ProductList;
