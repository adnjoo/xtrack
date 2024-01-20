'use client';

import * as React from "react";
import axios from "axios";

import { API_URL } from "@/app/lib/utils";

export default function Card() {
    const [data, setData] = React.useState<any>('');

    React.useEffect(() => {
        axios.get(API_URL).then((response) => {
            setData(response.data.message);
        })
    }, [])

    return (
        <div>
            {data && <h1>{data}</h1>}
        </div>
    )
}