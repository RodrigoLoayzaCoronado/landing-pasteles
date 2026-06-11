/**
 * PhraseInput
 * Input estilizado con contador de caracteres para la frase del pastel.
 *
 * Props:
 *  - value:     string
 *  - onChange:  (value: string) => void
 *  - maxLength: number (default: 25)
 */

const MAX = 25;

export default function PhraseInput({ value, onChange, maxLength = MAX }) {
  const remaining = maxLength - value.length;
  const isNearLimit = remaining <= 5;
  const isAtLimit   = remaining === 0;

  return (
    <div
      className={`
        bg-white rounded-2xl border-2 px-3 py-3 transition-colors
        focus-within:border-[#b8e7f0]
        ${isAtLimit ? 'border-[#c0396b]' : 'border-[#eee]'}
      `}
    >
      <input
        type="text"
        value={value}
        maxLength={maxLength}
        placeholder="Feliz cumple, amor! 🎉"
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full bg-transparent outline-none
          font-fredoka text-[20px] sm:text-[22px] text-[#1a1a2e] text-center
          placeholder:text-[#ddd]
          caret-[#c0396b]
        "
      />
      <div
        className={`text-right text-[11px] font-bold mt-1 ${
          isNearLimit ? 'text-[#c0396b]' : 'text-[#bbb]'
        }`}
      >
        {value.length} / {maxLength}
      </div>
    </div>
  );
}