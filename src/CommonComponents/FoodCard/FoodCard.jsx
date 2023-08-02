import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';

const FoodCard = ({ item }) => {
    const { name, image, recipe, price, _id } = item;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [, refetch] = useCart();

    const handleAddToCart = item => {
        console.log('aaa', item);
        if (user && user.email) {
            const cartItem = { menuItemId: _id, name, image, price, email: user.email }
            fetch('http://localhost:5000/carts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch();  // refetch cart to update the number of items in the cart
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Food added in the cart',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                    console.log('data', data);
                })
        }
        else {
            Swal.fire({
                title: 'Please sign in to order the food',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sign In Now'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img style={{ height: '320px', width: '100%' }} className=' border-lime-800' src={image} alt="Shoes" /></figure>
            <p className='absolute right-0 mr-4 mt-4 bg-yellow-500 px-4 text-white'>${price}</p>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>

                <div className="card-actions justify-center">
                    <button onClick={() => handleAddToCart(item)} className="btn btn-outline border-yellow-500 bg-slate-100 border-0 border-b-4">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;