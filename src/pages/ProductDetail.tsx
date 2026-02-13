
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/productSlice';
import { addToCart } from '../features/cartSlice';
import { ArrowLeft, ShoppingBag, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { items, status } = useAppSelector((state) => state.products);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
        window.scrollTo(0, 0);
    }, [status, dispatch]);

    const product = items.find((item) => item.id === Number(id));

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

    if (!product) {
        return (
            <div className="text-center py-20 flex flex-col items-center">
                <div className="p-6 bg-gray-100 rounded-full mb-6">
                    <ShoppingBag className="h-12 w-12 text-gray-400" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-4">Product Not Found</h2>
                <Link to="/" className="text-blue-600 font-bold border-b-2 border-blue-600 pb-1 hover:text-blue-700 transition-colors">Return to Boutique</Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-12"
            >
                <Link to="/" className="group inline-flex items-center text-gray-500 font-bold text-sm tracking-tight hover:text-blue-600 transition-colors">
                    <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 mr-4 group-hover:-translate-x-1 transition-transform">
                        <ArrowLeft className="h-4 w-4" />
                    </div>
                    Back to Collection
                </Link>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative group"
                >
                    <div className="absolute inset-0 bg-blue-600/5 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-700"></div>
                    <div className="relative aspect-[4/5] bg-white rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-500/5 border border-white p-4">
                        <img
                            src={product.images[0]?.replace('["', '').replace('"]', '') || "https://placehold.co/600x750"}
                            alt={product.title}
                            className="w-full h-full object-cover rounded-[2.5rem]"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://placehold.co/600x750";
                            }}
                        />
                    </div>
                </motion.div>

                <div className="flex flex-col">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
                            {product.category?.name || 'Premium Selection'}
                        </span>
                        <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tighter leading-[1.1]">
                            {product.title}
                        </h1>
                        <p className="text-xl text-gray-500 leading-relaxed mb-10 font-medium">
                            {product.description}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center space-x-6 mb-12"
                    >
                        <span className="text-5xl font-black text-gray-900 tracking-tighter">${product.price}</span>
                        <div className="h-10 w-px bg-gray-200"></div>
                        <div className="flex items-center text-green-600 font-bold text-sm bg-green-50 px-4 py-2 rounded-2xl">
                            <ShieldCheck className="h-4 w-4 mr-2" /> Verified Authentic
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <button
                            onClick={() => dispatch(addToCart(product))}
                            className="group relative w-full bg-gray-900 text-white py-6 rounded-[2rem] font-black text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-gray-900/20 active:scale-95"
                        >
                            <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                            <span className="relative flex items-center justify-center">
                                Add to Collection
                                <ShoppingBag className="ml-3 h-6 w-6" />
                            </span>
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="grid grid-cols-2 gap-4 mt-12"
                    >
                        <div className="flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <Truck className="h-5 w-5 text-gray-400 mr-4" />
                            <div>
                                <p className="text-xs font-black text-gray-900 uppercase">Fast Delivery</p>
                                <p className="text-[10px] text-gray-500 font-bold tracking-tight">2-3 Business Days</p>
                            </div>
                        </div>
                        <div className="flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <RefreshCw className="h-5 w-5 text-gray-400 mr-4" />
                            <div>
                                <p className="text-xs font-black text-gray-900 uppercase">30-Day Returns</p>
                                <p className="text-[10px] text-gray-500 font-bold tracking-tight">Easy Global Returns</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
