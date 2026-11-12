

"use client";

import { useState } from "react";

type MenuCardProps = {
  title: string;
  description: string;
  fileUrl?: string;
};

export default function MenuCard({ title, description, fileUrl }: MenuCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button" onClick={() => setIsOpen(true)} className="bg-white border rounded-lg shadow-sm p-6 text-left hover:shadow-lg transition cursor-pointer"
      >
        <h2 className="text-xl font-bold mb-3">{title}</h2>

        <p className="text-gray-600 mb-6">{description}</p>

        <span className="text-green-800 font-semibold">
          View Menu 
        </span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setIsOpen(false)}
        >

          <div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="bg-white rounded-lg p-8 max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-5 text-gray-500 hover:text-black text-2xl"
              aria-label="Close menu"
            >
              X
            </button>

            <h2 className="text-2xl font-bold mb-4">{title}</h2>

            <p className="text-gray-600 mb-6">
              {description}
            </p>

            {fileUrl ? (
                <iframe
                    src={fileUrl}
                    title={title}
                    className="w-full h-96 border rounded-lg"
                ></iframe>
            ) : (
                

            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <h3 className="font-semibold mb-2">
                Sample Menu Coming Soon
              </h3>

              <p className="text-gray-500">
                Our menus are currently being prepared.
              </p>
                        </div>
          )}

         </div>
        </div>
    )}
    </>
  );
}