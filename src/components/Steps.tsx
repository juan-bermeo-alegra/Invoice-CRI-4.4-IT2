interface StepsProps {
  currentStep?: 1 | 2 | 3;
}

function Steps({ currentStep = 1 }: StepsProps) {
  // Calculate the progress width percentage
  const progressPercentage = ((currentStep - 1) / 2) * 100;

  return (
    <div className="flex flex-col gap-1 items-start px-4 py-0 w-full">
      {/* Label: Paso X de 3 */}
      <p className="text-sm font-medium leading-5 text-slate-700">
        Paso {currentStep} de 3
      </p>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-400/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#30aba9] rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}

export default Steps;
