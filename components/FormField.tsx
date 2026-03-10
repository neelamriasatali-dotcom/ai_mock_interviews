// import React from 'react'
// import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
// import {Controller, FieldValues, Path, Control} from "react-hook-form";
// import {Input} from "@/components/ui/input";

// interface FormFieldProps<T extends FieldValues> {
//   control: Control<T>;
//   name: Path<T>;
//   label: string;
//   placeholder?: string;
//   type?: "text" | "email" | "password" | "file";
// }

// const FormField = ({ control, name, label, placeholder, type
// ="text" }: FormFieldProps<T>) => (
//     <Controller 
//     name={name} 
//     control={control} 
//     render={({ field }) => (
//            <FormItem>
//               <FormLabel className="label">{label}</FormLabel>
//               <FormControl>
//                 <Input className="input"
//                  placeholder={placeholder}
//                  type={type}
//                   {...field} 
//                   />
//               </FormControl>
             
//               <FormMessage />
//             </FormItem>
//   )}
          
          
//         />
//  );
 

// export default FormField




























"use client";

import React, { useState } from 'react'
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Controller, FieldValues, Path, Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "file";
}

const FormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text"
}: FormFieldProps<T>) => {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="label">{label}</FormLabel>

          <FormControl>
            <div className="relative">

              <Input
                className="input"
                placeholder={placeholder}
                type={type === "password" ? (showPassword ? "text" : "password") : type}
                // autoComplete="off"
                {...field}
              />

              {type === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400"
                >
                  {showPassword ? <Eye size={18}/> : <EyeOff size={18}/>}
                </button>
              )}

            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormField