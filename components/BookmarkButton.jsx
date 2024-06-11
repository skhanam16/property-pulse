'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {toast} from 'react-toastify';
import { FaBookmark } from 'react-icons/fa';

const BookmarkButton = ({ property }) => {

    const {data: session } = useSession();
    const userId = session?.user?.id;
    const [isBookmarked, setIsBookmarked ] = useState(false);
    const [loading, setLoading ] = useState(true);

    useEffect(() =>{
        if(!userId){
            setLoading(false);
            return;
        }
        const checkBookmarkStatus =  async () =>{
            try {
                const res = await fetch(`/api/bookmarks/check`, { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // propertyId that set to props(property) property._id
                    body: JSON.stringify( {
                        propertyId: property._id
                    }) 
                });
                if(res.status === 200){
                //    if everything is okay lets get the data
                    const data = await res.json();
                    // console.log(data); imp to see the data details
                    // if bookmarked then we got data from that route
                    setIsBookmarked(data.isBookmarked);
                    // setIsBookmarked(data);
                   
                }
            } catch (error) {
                    console.log(error);
           
            } 

            finally{
                setLoading(false);
            }

        }
        checkBookmarkStatus();

    }, [property._id, userId]);

    const handleClick = async () =>{
        //check for userId
        if(!userId){
            toast.error('You need to signin to bookmark a property');
            return;
        }
         try {
            // POST Request to add preoperty
            const res = await fetch(`/api/bookmarks`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( {
                    propertyId: property._id
                }) 
            });
            if(res.status === 200){
                // if everything is okay lets get the data
                const data = await res.json();
                // console.log(data); imp to see the data details
                // this will change to original state
                setIsBookmarked(data.isBookmarked);
                // setIsBookmarked(data);
                toast.success(data.message);
                // console.log("this is undefinced" + session.message);
                // ***data.message does not show message but if we show othere it works
               
            }
        } catch (error) {
                console.log(error);
                toast.error('Something went wrong');
        }
        
    } //end async function

    if(loading){
        return <p className='text-center'>Loading...</p>
    }
  return isBookmarked ? (<button onClick={handleClick}
    className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
   <FaBookmark className='inline mr-2' /> Remove Bookmark
    </button>) : (
    <button onClick={handleClick}
    className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
    <FaBookmark className='inline mr-2' /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
