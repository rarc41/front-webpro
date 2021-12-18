import React from "react";

const StepperProgress = ({ faseProyecto }) => {
  return (
    <>
      {faseProyecto === "INICIADO" && (
        <div class="flex gap-4 w-3/4 m-auto">
          <div class="border-t-4 border-indigo-500 pt-4 ">
            <p class=" text-indigo-500 font-bold text-xs">Iniciado</p>

            {/* <p class="font-semibold">Job details</p> */}
          </div>
          <div class="border-t-4 border-gray-200 pt-4 ">
            <p class=" text-gray-400 font-bold text-xs">Desarrollo</p>

            {/* <p class="font-semibold">Application form</p> */}
          </div>
          <div class="border-t-4 border-gray-200 pt-4 ">
            <p class=" text-gray-400 font-bold text-xs">Terminado</p>

            {/* <p class="font-semibold">Preview</p> */}
          </div>
        </div>
      )}
      {faseProyecto === "EN_DESARROLLO" && (
        <div class="flex gap-4 w-3/4 m-auto">
          <div class="border-t-4 border-indigo-500 pt-4 ">
            <p class=" text-indigo-500 font-bold text-xs">Iniciado</p>

            {/* <p class="font-semibold">Job details</p> */}
          </div>
          <div class="border-t-4 border-yellow-500 pt-4 ">
            <p class=" text-yellow-500 font-bold text-xs">Desarrollo</p>

            {/* <p class="font-semibold">Application form</p> */}
          </div>
          <div class="border-t-4 border-gray-200 pt-4 ">
            <p class=" text-gray-400 font-bold text-xs">Terminado</p>

            {/* <p class="font-semibold">Preview</p> */}
          </div>
        </div>
      )}
      {faseProyecto === "TERMINADO" && (
        <div class="flex gap-4 w-3/4 m-auto">
          <div class="border-t-4 border-indigo-500 pt-4 ">
            <p class=" text-indigo-500 font-bold text-xs">Iniciado</p>

            {/* <p class="font-semibold">Job details</p> */}
          </div>
          <div class="border-t-4 border-yellow-500 pt-4 ">
            <p class=" text-yellow-500 font-bold text-xs">Desarrollo</p>

            {/* <p class="font-semibold">Application form</p> */}
          </div>
          <div class="border-t-4 border-green-500 pt-4 ">
            <p class=" text-green-500 font-bold text-xs">Terminado</p>

            {/* <p class="font-semibold">Preview</p> */}
          </div>
        </div>
      )}
    </>
  );
};

export default StepperProgress;
