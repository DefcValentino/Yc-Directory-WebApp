"use client";

import React, { useEffect, useState } from 'react';
import Ping from './Ping';

const View = ({ id }) => {
  const [views, setViews] = useState(0);

  useEffect(() => {
    const updateViews = async () => {
      try {
        // 1. Fetch current views
        const res = await fetch(`/api/views/${id}`);
        const data = await res.json();

        if (data.success) {
          setViews(data.views);

          // 2. Update views
          await fetch(`/api/views/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, currentViews: data.views }),
          });
        }
      } catch (error) {
        console.error('Failed to fetch or update views:', error);
      }
    };

    updateViews();
  }, [id]);

  return (
    <div className='view-container bg-pink-200 p-3 rounded-md'>
      <div className='absolute -top-2 -right-2'>
        <Ping />
      </div>
      <p className='view-text'>
        <span className='font-black'>Views: {views}</span>
      </p>
    </div>
  );
};

export default View;