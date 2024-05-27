"use client"
import { useState } from 'react';
import { detectPlagiarism } from './utils/plagiarism';

export default function Home() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [result, setResult] = useState<any>();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { similarity, lang1, lang2 } = detectPlagiarism(text1, text2);
    setResult({ similarity, lang1, lang2 });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 className='font-bold text-lg'>ກວດການລ່ວງລະເມີດລິຂະສິດ</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            rows={5}
            cols={50}
            placeholder="ປ້ອນປະໂຫຍກທຳອິດ"
            required
          />
        </div>
        <div>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            rows={5}
            cols={50}
            placeholder="ປ້ອນປະໂຫຍກທີ່ສອງ"
            required
          />
        </div>
        <button
          type="submit"
          className='bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-sm'
        >
          ກວດສອບ

        </button>
        <button
          type="reset"
          onClick={() => {
            setText1('')
            setText2('')
            setResult(null)
          }}
          className='bg-slate-500 hover:bg-slate-400 px-4 py-2 rounded-sm ml-5'
        >
          Reset

        </button>
      </form>
      {result && (
        <div>
          <h2>ຕົວເລກປະໂຫຍກທີ່ຄ້າຍຄືກັນ: {result.similarity.toFixed(2)}</h2>
          <p>ພາສາຂອງປະໂຫຍກທີ່ 1: ພາສາ {result.lang1}</p>
          <p>ພາສາຂອງປະໂຫຍກທີ່ 2: ພາສາ {result.lang2}</p>
          {result.similarity > 0.5 ? (
            <p className='text-red-500'>ມີການລະເມີດລິຂະສິດ.</p>
          ) : (
            <p>ບໍ່ມີການລະເມີດລິຂະສິດ.</p>
          )}
        </div>
      )}
    </div>
  );
}
