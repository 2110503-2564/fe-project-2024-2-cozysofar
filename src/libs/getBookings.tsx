export default async function getBookings(token:string){
    const response = await fetch('https://cozyhotel-be.vercel.app/api/v1/api/v1/bookings', {
        cache: 'no-store',
        headers: {
            authorization: `Bearer ${token}`,
        }
    })


    console.log(response)
    if(!response.ok){
        throw new Error('Cannot get bookings')
    }

    return await response.json()
}