import { saleToken } from '@/app/constants/baseUrl'
import { timeConverter } from '@/app/constants/helper'

import React from 'react'

function page({params}:{params:{nftDetails:string}}) {
    
 
    return (

<>    
<div>page is : {params.nftDetails}</div>
 </> 
               
)
}

export default page