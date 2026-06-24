import { FiX, FiTrash2, FiShoppingCart, FiPlus, FiMinus } from 'react-icons/fi';

const CartModal = ({ isOpen, onClose, cartItems, onRemoveItem, onIncrement, onDecrement, onRemoveAll }) => {
  if (!isOpen) return null;

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  // Group items by ID to show quantity
  const groupedItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop with Blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col h-[80vh] max-h-[700px] overflow-hidden transform transition-all duration-300 animate-zoom-in animate-fade-in">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
              <FiShoppingCart size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Shopping Cart</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-gray-800"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <FiShoppingCart size={32} className="text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium text-lg">Your cart is empty</p>
              <button 
                onClick={onClose}
                className="mt-4 text-blue-600 font-semibold hover:underline"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {groupedItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-100 rounded-xl hover:border-blue-100 hover:bg-blue-50/30 transition-all group"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 sm:w-16 sm:h-16 object-cover rounded-lg shadow-sm"
                  />
                  <div className="flex-grow flex flex-col justify-between min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <h4 className="font-bold text-gray-800 text-sm sm:text-base truncate">{item.name}</h4>
                        <p className="text-blue-600 font-semibold text-sm">₹{item.price}</p>
                      </div>
                      <button 
                        onClick={() => onRemoveAll(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all flex-shrink-0"
                        title="Remove all"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between sm:justify-start gap-4 mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-gray-100 rounded-lg p-1">
                        <button 
                          onClick={() => onDecrement(item.id)}
                          className="p-1 hover:bg-white rounded-md transition-colors text-gray-600"
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="px-3 font-bold text-gray-800 text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => onIncrement(item)}
                          className="p-1 hover:bg-white rounded-md transition-colors text-gray-600"
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>
                      
                      <div className="hidden sm:block text-right flex-grow">
                        <p className="text-sm font-bold text-gray-800">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-6 border-t bg-gray-50/50">
            <div className="flex items-center justify-between mb-4">

              <div>

                <span className="text-gray-500 text-sm block">Subtotal</span>

                <span className="text-2xl font-black text-gray-900">₹{totalPrice}</span>

              </div>

              <div className="text-right">
                <span className="text-green-600 text-xs font-bold bg-green-100 px-2 py-1 rounded-full">
                  FREE SHIPPING
                </span>
              </div>

            </div>
            
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
