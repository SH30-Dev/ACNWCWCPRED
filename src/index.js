import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';

// ─── SUPABASE CONFIG ─────────────────────────────────────────────────────────
// Keys come from Vercel Environment Variables (see DEPLOYMENT_GUIDE.txt)
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'https://aduxlinuyiednhysxtsc.supabase.co/rest/v1/';
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkdXhsaW51eWllZG5oeXN4dHNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NzIzNDMsImV4cCI6MjA5NjE0ODM0M30.rX1Q5pgjsJjZSWMnGa32SbWMUjeOPhjc5SpdUYmPzIs';
const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || 'WC2026admin';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── WORLD CUP DATA ──────────────────────────────────────────────────────────
const GROUPS = {
  A: ['Mexico','South Africa','South Korea','Czechia'],
  B: ['Canada','Bosnia & Herz.','Qatar','Switzerland'],
  C: ['Brazil','Morocco','Haiti','Scotland'],
  D: ['USA','Paraguay','Australia','Turkiye'],
  E: ['Germany','Curacao','Ivory Coast','Ecuador'],
  F: ['Netherlands','Japan','Sweden','Tunisia'],
  G: ['Belgium','Egypt','Iran','New Zealand'],
  H: ['Spain','Cape Verde','Saudi Arabia','Uruguay'],
  I: ['France','Senegal','Iraq','Norway'],
  J: ['Argentina','Algeria','Austria','Jordan'],
  K: ['Portugal','DR Congo','Uzbekistan','Colombia'],
  L: ['England','Croatia','Ghana','Panama'],
};

const MATCHES = [
  {n:1, d:'Jun 11',g:'A',t1:'Mexico',           t2:'South Africa'},
  {n:2, d:'Jun 11',g:'A',t1:'South Korea',       t2:'Czechia'},
  {n:3, d:'Jun 12',g:'B',t1:'Canada',            t2:'Bosnia & Herz.'},
  {n:4, d:'Jun 12',g:'D',t1:'USA',               t2:'Paraguay'},
  {n:5, d:'Jun 13',g:'D',t1:'Australia',         t2:'Turkiye'},
  {n:6, d:'Jun 13',g:'B',t1:'Qatar',             t2:'Switzerland'},
  {n:7, d:'Jun 13',g:'C',t1:'Brazil',            t2:'Morocco'},
  {n:8, d:'Jun 13',g:'C',t1:'Haiti',             t2:'Scotland'},
  {n:9, d:'Jun 14',g:'E',t1:'Germany',           t2:'Curacao'},
  {n:10,d:'Jun 14',g:'F',t1:'Netherlands',       t2:'Japan'},
  {n:11,d:'Jun 14',g:'E',t1:'Ivory Coast',       t2:'Ecuador'},
  {n:12,d:'Jun 14',g:'F',t1:'Sweden',            t2:'Tunisia'},
  {n:13,d:'Jun 15',g:'H',t1:'Spain',             t2:'Cape Verde'},
  {n:14,d:'Jun 15',g:'G',t1:'Belgium',           t2:'Egypt'},
  {n:15,d:'Jun 15',g:'H',t1:'Saudi Arabia',      t2:'Uruguay'},
  {n:16,d:'Jun 15',g:'G',t1:'Iran',              t2:'New Zealand'},
  {n:17,d:'Jun 16',g:'I',t1:'France',            t2:'Senegal'},
  {n:18,d:'Jun 16',g:'I',t1:'Iraq',              t2:'Norway'},
  {n:19,d:'Jun 16',g:'J',t1:'Argentina',         t2:'Algeria'},
  {n:20,d:'Jun 16',g:'J',t1:'Austria',           t2:'Jordan'},
  {n:21,d:'Jun 17',g:'K',t1:'Portugal',          t2:'DR Congo'},
  {n:22,d:'Jun 17',g:'L',t1:'England',           t2:'Croatia'},
  {n:23,d:'Jun 17',g:'L',t1:'Ghana',             t2:'Panama'},
  {n:24,d:'Jun 17',g:'K',t1:'Uzbekistan',        t2:'Colombia'},
  {n:25,d:'Jun 18',g:'A',t1:'Czechia',           t2:'South Africa'},
  {n:26,d:'Jun 18',g:'B',t1:'Switzerland',       t2:'Bosnia & Herz.'},
  {n:27,d:'Jun 18',g:'B',t1:'Canada',            t2:'Qatar'},
  {n:28,d:'Jun 18',g:'A',t1:'Mexico',            t2:'South Korea'},
  {n:29,d:'Jun 19',g:'D',t1:'USA',               t2:'Australia'},
  {n:30,d:'Jun 19',g:'C',t1:'Scotland',          t2:'Morocco'},
  {n:31,d:'Jun 19',g:'C',t1:'Brazil',            t2:'Haiti'},
  {n:32,d:'Jun 19',g:'D',t1:'Turkiye',           t2:'Paraguay'},
  {n:33,d:'Jun 20',g:'F',t1:'Netherlands',       t2:'Sweden'},
  {n:34,d:'Jun 20',g:'E',t1:'Germany',           t2:'Ivory Coast'},
  {n:35,d:'Jun 20',g:'E',t1:'Ecuador',           t2:'Curacao'},
  {n:36,d:'Jun 20',g:'F',t1:'Tunisia',           t2:'Japan'},
  {n:37,d:'Jun 21',g:'H',t1:'Spain',             t2:'Saudi Arabia'},
  {n:38,d:'Jun 21',g:'G',t1:'Belgium',           t2:'Iran'},
  {n:39,d:'Jun 21',g:'H',t1:'Uruguay',           t2:'Cape Verde'},
  {n:40,d:'Jun 21',g:'G',t1:'New Zealand',       t2:'Egypt'},
  {n:41,d:'Jun 22',g:'J',t1:'Argentina',         t2:'Austria'},
  {n:42,d:'Jun 22',g:'I',t1:'France',            t2:'Iraq'},
  {n:43,d:'Jun 22',g:'I',t1:'Norway',            t2:'Senegal'},
  {n:44,d:'Jun 22',g:'J',t1:'Jordan',            t2:'Algeria'},
  {n:45,d:'Jun 23',g:'K',t1:'Portugal',          t2:'Uzbekistan'},
  {n:46,d:'Jun 23',g:'L',t1:'England',           t2:'Ghana'},
  {n:47,d:'Jun 23',g:'L',t1:'Panama',            t2:'Croatia'},
  {n:48,d:'Jun 23',g:'K',t1:'Colombia',          t2:'DR Congo'},
  {n:49,d:'Jun 24',g:'B',t1:'Switzerland',       t2:'Canada'},
  {n:50,d:'Jun 24',g:'B',t1:'Bosnia & Herz.',    t2:'Qatar'},
  {n:51,d:'Jun 24',g:'C',t1:'Scotland',          t2:'Brazil'},
  {n:52,d:'Jun 24',g:'C',t1:'Morocco',           t2:'Haiti'},
  {n:53,d:'Jun 24',g:'A',t1:'Czechia',           t2:'Mexico'},
  {n:54,d:'Jun 24',g:'A',t1:'South Africa',      t2:'South Korea'},
  {n:55,d:'Jun 25',g:'E',t1:'Ecuador',           t2:'Germany'},
  {n:56,d:'Jun 25',g:'E',t1:'Curacao',           t2:'Ivory Coast'},
  {n:57,d:'Jun 25',g:'F',t1:'Japan',             t2:'Sweden'},
  {n:58,d:'Jun 25',g:'F',t1:'Tunisia',           t2:'Netherlands'},
  {n:59,d:'Jun 25',g:'D',t1:'Turkiye',           t2:'USA'},
  {n:60,d:'Jun 25',g:'D',t1:'Paraguay',          t2:'Australia'},
  {n:61,d:'Jun 26',g:'I',t1:'Norway',            t2:'France'},
  {n:62,d:'Jun 26',g:'I',t1:'Senegal',           t2:'Iraq'},
  {n:63,d:'Jun 26',g:'H',t1:'Cape Verde',        t2:'Saudi Arabia'},
  {n:64,d:'Jun 26',g:'H',t1:'Uruguay',           t2:'Spain'},
  {n:65,d:'Jun 26',g:'G',t1:'Egypt',             t2:'Iran'},
  {n:66,d:'Jun 26',g:'G',t1:'New Zealand',       t2:'Belgium'},
  {n:67,d:'Jun 27',g:'L',t1:'Panama',            t2:'England'},
  {n:68,d:'Jun 27',g:'L',t1:'Croatia',           t2:'Ghana'},
  {n:69,d:'Jun 27',g:'K',t1:'Colombia',          t2:'Portugal'},
  {n:70,d:'Jun 27',g:'K',t1:'DR Congo',          t2:'Uzbekistan'},
  {n:71,d:'Jun 27',g:'J',t1:'Algeria',           t2:'Austria'},
  {n:72,d:'Jun 27',g:'J',t1:'Jordan',            t2:'Argentina'},
];

// Official FIFA 2026 R32 bracket – team sources
const KO_BRACKET = [
  {code:'M73', rnd:'R32', d:'Jun 29', t1src:{type:'runner',g:'A'}, t2src:{type:'runner',g:'B'}},
  {code:'M74', rnd:'R32', d:'Jun 30', t1src:{type:'winner',g:'E'}, t2src:{type:'best3rd',n:1}},
  {code:'M75', rnd:'R32', d:'Jun 30', t1src:{type:'winner',g:'F'}, t2src:{type:'runner',g:'C'}},
  {code:'M76', rnd:'R32', d:'Jun 30', t1src:{type:'winner',g:'C'}, t2src:{type:'runner',g:'F'}},
  {code:'M77', rnd:'R32', d:'Jul 1',  t1src:{type:'winner',g:'I'}, t2src:{type:'best3rd',n:2}},
  {code:'M78', rnd:'R32', d:'Jul 1',  t1src:{type:'runner',g:'E'}, t2src:{type:'runner',g:'I'}},
  {code:'M79', rnd:'R32', d:'Jul 1',  t1src:{type:'winner',g:'A'}, t2src:{type:'best3rd',n:3}},
  {code:'M80', rnd:'R32', d:'Jul 2',  t1src:{type:'winner',g:'L'}, t2src:{type:'best3rd',n:4}},
  {code:'M81', rnd:'R32', d:'Jul 2',  t1src:{type:'winner',g:'D'}, t2src:{type:'best3rd',n:5}},
  {code:'M82', rnd:'R32', d:'Jul 2',  t1src:{type:'winner',g:'G'}, t2src:{type:'best3rd',n:6}},
  {code:'M83', rnd:'R32', d:'Jul 3',  t1src:{type:'runner',g:'K'}, t2src:{type:'runner',g:'L'}},
  {code:'M84', rnd:'R32', d:'Jul 3',  t1src:{type:'winner',g:'H'}, t2src:{type:'runner',g:'J'}},
  {code:'M85', rnd:'R32', d:'Jul 3',  t1src:{type:'winner',g:'B'}, t2src:{type:'best3rd',n:7}},
  {code:'M86', rnd:'R32', d:'Jul 4',  t1src:{type:'winner',g:'J'}, t2src:{type:'runner',g:'H'}},
  {code:'M87', rnd:'R32', d:'Jul 4',  t1src:{type:'winner',g:'K'}, t2src:{type:'best3rd',n:8}},
  {code:'M88', rnd:'R32', d:'Jul 4',  t1src:{type:'runner',g:'D'}, t2src:{type:'runner',g:'G'}},
  {code:'M89', rnd:'R16', d:'Jul 5',  t1src:{type:'ko',from:'M74'}, t2src:{type:'ko',from:'M77'}},
  {code:'M90', rnd:'R16', d:'Jul 5',  t1src:{type:'ko',from:'M73'}, t2src:{type:'ko',from:'M75'}},
  {code:'M91', rnd:'R16', d:'Jul 6',  t1src:{type:'ko',from:'M76'}, t2src:{type:'ko',from:'M78'}},
  {code:'M92', rnd:'R16', d:'Jul 6',  t1src:{type:'ko',from:'M79'}, t2src:{type:'ko',from:'M80'}},
  {code:'M93', rnd:'R16', d:'Jul 7',  t1src:{type:'ko',from:'M83'}, t2src:{type:'ko',from:'M84'}},
  {code:'M94', rnd:'R16', d:'Jul 7',  t1src:{type:'ko',from:'M81'}, t2src:{type:'ko',from:'M82'}},
  {code:'M95', rnd:'R16', d:'Jul 8',  t1src:{type:'ko',from:'M86'}, t2src:{type:'ko',from:'M88'}},
  {code:'M96', rnd:'R16', d:'Jul 8',  t1src:{type:'ko',from:'M85'}, t2src:{type:'ko',from:'M87'}},
  {code:'M97', rnd:'QF',  d:'Jul 10', t1src:{type:'ko',from:'M89'}, t2src:{type:'ko',from:'M90'}},
  {code:'M98', rnd:'QF',  d:'Jul 11', t1src:{type:'ko',from:'M93'}, t2src:{type:'ko',from:'M94'}},
  {code:'M99', rnd:'QF',  d:'Jul 12', t1src:{type:'ko',from:'M91'}, t2src:{type:'ko',from:'M92'}},
  {code:'M100',rnd:'QF',  d:'Jul 12', t1src:{type:'ko',from:'M95'}, t2src:{type:'ko',from:'M96'}},
  {code:'M101',rnd:'SF',  d:'Jul 15', t1src:{type:'ko',from:'M97'}, t2src:{type:'ko',from:'M98'}},
  {code:'M102',rnd:'SF',  d:'Jul 16', t1src:{type:'ko',from:'M99'}, t2src:{type:'ko',from:'M100'}},
  {code:'M103',rnd:'3P',  d:'Jul 19', t1src:{type:'koL',from:'M101'},t2src:{type:'koL',from:'M102'}},
  {code:'M104',rnd:'F',   d:'Jul 20', t1src:{type:'ko',from:'M101'}, t2src:{type:'ko',from:'M102'}},
];

const RND_LABEL = {R32:'Round of 32',R16:'Round of 16',QF:'Quarter-finals',SF:'Semi-finals','3P':'Third-place play-off',F:'Final'};
const KO_PTS    = {R32:1,R16:2,QF:3,SF:4,F:4};

const ALL_COUNTRIES = ['Algeria','Argentina','Australia','Austria','Belgium','Bosnia & Herz.','Brazil',
  'Canada','Cape Verde','Colombia','Croatia','Curacao','Czechia','DR Congo','Ecuador','Egypt','England',
  'France','Germany','Ghana','Haiti','Iran','Iraq','Ivory Coast','Japan','Jordan','Mexico','Morocco',
  'Netherlands','New Zealand','Norway','Panama','Paraguay','Portugal','Qatar','Saudi Arabia','Scotland',
  'Senegal','South Africa','South Korea','Spain','Sweden','Switzerland','Tunisia','Turkiye','Uruguay',
  'USA','Uzbekistan'];

const BELGIUM_SQUAD = ['Alexis Saelemaekers','Amadou Onana','Arthur Theate','Axel Witsel','Brandon Mechele',
  'Charles De Ketelaere','Diego Moreira','Dodi Lukebakio','Hans Vanaken','Joaquin Seys','Jérémy Doku',
  'Kevin De Bruyne','Koni De Winter','Leandro Trossard','Matias Fernandez-Pardo','Maxim De Cuyper',
  'Mike Penders','Nathan Ngoy','Nicolas Raskin','Romelu Lukaku','Senne Lammens','Thibaut Courtois',
  'Thomas Meunier','Timothy Castagne','Youri Tielemans','Zeno Debast'];

// ─── QUALIFICATION ENGINE ────────────────────────────────────────────────────

function calcGroupStats(scores) {
  const st = {};
  for (const g in GROUPS) {
    st[g] = {};
    for (const t of GROUPS[g])
      st[g][t] = { P:0,W:0,D:0,L:0,GF:0,GA:0,GD:0,Pts:0 };
  }
  for (const m of MATCHES) {
    const s = scores[m.n];
    if (!s || s.s1 === '' || s.s2 === '') continue;
    const s1 = +s.s1, s2 = +s.s2;
    const a = st[m.g][m.t1], b = st[m.g][m.t2];
    a.P++; b.P++; a.GF += s1; a.GA += s2; b.GF += s2; b.GA += s1;
    a.GD = a.GF - a.GA; b.GD = b.GF - b.GA;
    if (s1 > s2)      { a.W++; a.Pts += 3; b.L++; }
    else if (s1 < s2) { b.W++; b.Pts += 3; a.L++; }
    else              { a.D++; b.D++; a.Pts++; b.Pts++; }
  }
  return st;
}

function h2hTied(tied, grp, scores) {
  const h = {};
  for (const t of tied) h[t] = { Pts:0, GD:0, GF:0 };
  const ts = new Set(tied);
  for (const m of MATCHES) {
    if (m.g !== grp || !ts.has(m.t1) || !ts.has(m.t2)) continue;
    const s = scores[m.n];
    if (!s || s.s1 === '' || s.s2 === '') continue;
    const s1 = +s.s1, s2 = +s.s2;
    h[m.t1].GF += s1; h[m.t1].GD += s1 - s2;
    h[m.t2].GF += s2; h[m.t2].GD += s2 - s1;
    if      (s1 > s2) { h[m.t1].Pts += 3; }
    else if (s1 < s2) { h[m.t2].Pts += 3; }
    else              { h[m.t1].Pts++; h[m.t2].Pts++; }
  }
  return h;
}

function rankGroup(grp, scores) {
  const st = calcGroupStats(scores)[grp];
  const teams = GROUPS[grp];
  const byPts = {};
  for (const t of teams) (byPts[st[t].Pts] = byPts[st[t].Pts] || []).push(t);
  const ranks = {};
  let cur = 1;
  for (const pts of Object.keys(byPts).map(Number).sort((a,b) => b-a)) {
    const tied = byPts[pts];
    if (tied.length === 1) {
      ranks[tied[0]] = cur;
    } else {
      const h = h2hTied(tied, grp, scores);
      const sorted = [...tied].sort((a, b) => {
        if (h[b].Pts !== h[a].Pts) return h[b].Pts - h[a].Pts;
        if (h[b].GD  !== h[a].GD)  return h[b].GD  - h[a].GD;
        if (h[b].GF  !== h[a].GF)  return h[b].GF  - h[a].GF;
        if (st[b].GD !== st[a].GD) return st[b].GD - st[a].GD;
        if (st[b].GF !== st[a].GF) return st[b].GF - st[a].GF;
        return teams.indexOf(a) - teams.indexOf(b); // draw position tiebreaker
      });
      sorted.forEach((t, i) => { ranks[t] = cur + i; });
    }
    cur += tied.length;
  }
  return { ranks, stats: st };
}

function getQualifiers(scores) {
  const winners = {}, runners = {}, thirds = [];
  for (const g in GROUPS) {
    const { ranks, stats } = rankGroup(g, scores);
    for (const t of GROUPS[g]) {
      if (ranks[t] === 1) winners[g] = t;
      if (ranks[t] === 2) runners[g] = t;
      if (ranks[t] === 3)
        thirds.push({ g, t, Pts: stats[t].Pts, GD: stats[t].GD, GF: stats[t].GF });
    }
  }
  const gOrd = Object.keys(GROUPS);
  thirds.sort((a, b) =>
    b.Pts - a.Pts || b.GD - a.GD || b.GF - a.GF ||
    gOrd.indexOf(a.g) - gOrd.indexOf(b.g)
  );
  return { winners, runners, thirds, best8: thirds.slice(0, 8) };
}

function resolveKOTeam(src, q, koW) {
  if (src.type === 'winner')  return q.winners[src.g] || 'TBD';
  if (src.type === 'runner')  return q.runners[src.g] || 'TBD';
  if (src.type === 'best3rd') return q.best8[src.n - 1]?.t || 'TBD';
  if (src.type === 'ko')      return koW[src.from] || 'TBD';
  if (src.type === 'koL') {
    const m = KO_BRACKET.find(x => x.code === src.from);
    if (!m) return 'TBD';
    const w = koW[src.from]; if (!w) return 'TBD';
    const t1 = resolveKOTeam(m.t1src, q, koW);
    return w === t1 ? resolveKOTeam(m.t2src, q, koW) : t1;
  }
  return 'TBD';
}

// ─── SCORING ENGINE ──────────────────────────────────────────────────────────

function scoreOutcome(s1, s2) {
  return s1 > s2 ? 'W1' : s1 < s2 ? 'W2' : 'D';
}

function calcParticipantScore(sub, actualScores, actualKoW, bonusActual) {
  let grpPts = 0, koPts = 0, bonusPts = 0;

  // Group stage
  for (const m of MATCHES) {
    const pred = sub.group_scores?.[m.n];
    const act  = actualScores[m.n];
    if (!pred || !act || pred.s1 === '' || pred.s2 === '') continue;
    const pr = scoreOutcome(+pred.s1, +pred.s2);
    const ar = scoreOutcome(+act.s1,  +act.s2);
    if (pr === ar) {
      grpPts += 3;
      if (+pred.s1 === +act.s1 && +pred.s2 === +act.s2) grpPts += 2;
    }
  }

  // Knockout stage — points per correct team reaching a round
  for (const m of KO_BRACKET) {
    if (m.rnd === '3P') continue;
    const predW = sub.ko_winners?.[m.code];
    if (!predW) continue;
    const actW  = actualKoW[m.code];
    if (!actW) continue;
    if (predW === actW) {
      koPts += KO_PTS[m.rnd] || 0;
      if (m.rnd === 'F') koPts += 5; // +5 extra for correct winner
    }
  }

  // Bonus
  const b  = sub.bonus || {};
  const ba = bonusActual || {};
  if (ba.scorer && b.scorer && b.scorer.toLowerCase() === ba.scorer.toLowerCase())
    bonusPts += Number(ba.scorerGoals || 0);
  if (ba.redcard && b.redcard === ba.redcard) bonusPts += 5;
  if (ba.penalty && b.penalty === ba.penalty) bonusPts += 5;
  if (ba.header  && b.header  === ba.header)  bonusPts += 5;

  return { grpPts, koPts, bonusPts, total: grpPts + koPts + bonusPts };
}

// ─── SUPABASE CLIENT ─────────────────────────────────────────────────────────


const P = '#A100FF';
const PD = '#6B00AA';
const PL = '#EDD9FF';

const css = `
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:Arial,sans-serif;background:#f3e8ff;color:#111;font-size:14px}
  .app{max-width:960px;margin:0 auto;padding:12px}

  .topbar{background:${P};color:#fff;padding:12px 20px;border-radius:12px;
    display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:8px}
  .topbar h1{font-size:15px;font-weight:500;letter-spacing:.3px}
  .nav{display:flex;gap:6px;flex-wrap:wrap}
  .nav-btn{background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.35);color:#fff;
    padding:6px 14px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:500;transition:.15s}
  .nav-btn:hover{background:rgba(255,255,255,.25)}
  .nav-btn.active{background:#fff;color:${P}}

  .card{background:#fff;border:0.5px solid #e5e7eb;border-radius:12px;padding:16px;margin-bottom:12px}
  .card-title{font-size:11px;font-weight:500;color:#666;text-transform:uppercase;letter-spacing:.5px;margin-bottom:12px}

  /* form */
  .field-row{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:12px}
  @media(max-width:600px){.field-row{grid-template-columns:1fr}}
  .field label{display:block;font-size:11px;color:#555;margin-bottom:4px;font-weight:500}
  .field input,.field select{width:100%;padding:7px 10px;border:1px solid #d1d5db;border-radius:6px;
    font-size:13px;background:#fff;color:#111}
  .field input:focus,.field select:focus{outline:2px solid ${P};border-color:transparent}

  /* section nav */
  .section-nav{display:flex;gap:6px;margin-bottom:12px;overflow-x:auto;padding-bottom:4px}
  .snav-btn{background:#f3f4f6;border:0.5px solid #e5e7eb;color:#555;padding:6px 14px;
    border-radius:6px;cursor:pointer;font-size:12px;white-space:nowrap;flex-shrink:0}
  .snav-btn.active{background:${P};color:#fff;border-color:${P}}

  /* group header */
  .grp-hdr{background:${P};color:#fff;padding:8px 12px;border-radius:6px;font-size:12px;
    font-weight:500;margin:10px 0 4px;display:flex;justify-content:space-between;align-items:center}

  /* match row */
  .match-row{display:grid;grid-template-columns:32px 72px 28px 1fr 36px 36px 1fr 90px;
    gap:5px;align-items:center;padding:5px 10px;border-radius:5px;background:#fafafa}
  .match-row:nth-child(even){background:#fff}
  @media(max-width:600px){
    .match-row{grid-template-columns:24px 56px 22px 1fr 32px 32px 1fr 0;font-size:11px}
    .match-result-col{display:none}
  }
  .mnum{font-size:10px;color:#999;text-align:center}
  .mdate{font-size:10px;color:#777}
  .mgrp{font-size:10px;font-weight:500;color:${P};background:${PL};border-radius:3px;padding:2px 4px;text-align:center}
  .tname{font-size:12px;font-weight:500}
  .tname.r{text-align:right}
  .sinp{width:36px;padding:4px;text-align:center;border:1px solid #d1d5db;border-radius:4px;
    font-size:13px;font-weight:500;background:#fdf5ff;color:${PD}}
  .sinp:focus{outline:2px solid ${P};border-color:transparent}
  .vs{font-size:10px;color:#aaa;text-align:center}
  .mresult{font-size:10px;color:#888;text-align:right}

  /* KO row */
  .ko-row{display:grid;grid-template-columns:52px 64px 1fr 24px 1fr 180px;
    gap:5px;align-items:center;padding:5px 10px;border-radius:5px;background:#fafafa;margin-bottom:2px}
  .ko-row:nth-child(even){background:#fff}
  @media(max-width:600px){.ko-row{grid-template-columns:40px 1fr 20px 1fr 1fr;font-size:11px}}
  .ko-code{font-size:11px;font-weight:500;color:${P}}
  .ko-date{font-size:10px;color:#777}
  .ko-team{font-size:12px;font-weight:500;font-style:italic;color:#555}
  .ko-team.r{text-align:right}
  .ko-sel{width:100%;padding:5px 8px;border:1px solid #d1d5db;border-radius:5px;
    font-size:12px;background:#fdf5ff;color:${PD};font-weight:500}
  .ko-sel:focus{outline:2px solid ${P};border-color:transparent}

  /* bonus */
  .bonus-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  @media(max-width:600px){.bonus-grid{grid-template-columns:1fr}}
  .pts-hint{font-size:10px;color:#999;margin-top:3px}

  /* submit */
  .submit-btn{background:${P};color:#fff;border:none;padding:12px 32px;border-radius:8px;
    font-size:14px;font-weight:500;cursor:pointer;width:100%;margin-top:10px}
  .submit-btn:hover{background:${PD}}
  .submit-btn:disabled{background:#ccc;cursor:not-allowed}

  /* leaderboard */
  .lb-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px}
  @media(max-width:500px){.lb-stats{grid-template-columns:repeat(2,1fr)}}
  .stat-box{background:#f9fafb;border-radius:8px;padding:10px;text-align:center}
  .stat-val{font-size:22px;font-weight:500;color:${P}}
  .stat-lbl{font-size:10px;color:#888;margin-top:2px}
  .lb-table{width:100%;border-collapse:collapse}
  .lb-table th{padding:7px 10px;text-align:left;font-size:10px;font-weight:500;color:#666;
    border-bottom:1px solid #e5e7eb;text-transform:uppercase;letter-spacing:.3px}
  .lb-table td{padding:8px 10px;border-bottom:0.5px solid #f3f4f6;font-size:13px}
  .lb-table tr:hover td{background:#faf5ff}
  .pts-big{font-size:17px;font-weight:500;color:${P}}
  .pts-sub{font-size:10px;color:#aaa}

  /* standings */
  .std-table{width:100%;border-collapse:collapse;font-size:12px}
  .std-table th{color:#777;font-weight:500;padding:4px 6px;border-bottom:1px solid #f3f4f6;text-align:center}
  .std-table th:first-child{text-align:left}
  .std-table td{padding:5px 6px;border-bottom:0.5px solid #f5f5f5;text-align:center}
  .std-table td:first-child{text-align:left;font-weight:500}
  .row-1{background:#FFF9E6}
  .row-2{background:#ECFDF5}
  .row-3{background:#F5F0FF}
  .row-4{background:#FFF1F1}
  .badge{display:inline-block;font-size:10px;padding:2px 6px;border-radius:10px;font-weight:500}
  .bw{background:#FEF3C7;color:#92400E}
  .bq{background:#D1FAE5;color:#065F46}
  .bt{background:#EDE9FE;color:#5B21B6}
  .be{background:#FEE2E2;color:#991B1B}

  /* admin */
  .admin-match-row{display:grid;grid-template-columns:80px 1fr 40px 40px 1fr 90px;
    gap:6px;align-items:center;padding:6px 10px;border-radius:5px;background:#fafafa;margin-bottom:2px;font-size:12px}
  .admin-match-row:nth-child(even){background:#fff}
  .a-inp{width:40px;padding:5px;text-align:center;border:1px solid #d1d5db;border-radius:4px;font-size:13px;font-weight:500}
  .a-inp:focus{outline:2px solid ${P};border-color:transparent}
  .save-btn{background:${P};color:#fff;border:none;padding:5px 11px;border-radius:5px;font-size:11px;cursor:pointer;font-weight:500}
  .save-btn:hover{background:${PD}}
  .saved-badge{background:#D1FAE5;color:#065F46;font-size:10px;padding:2px 6px;border-radius:10px;font-weight:500}

  /* admin login */
  .login-wrap{max-width:300px;margin:48px auto;text-align:center}
  .login-wrap input{width:100%;padding:10px;margin:8px 0;border:1px solid #d1d5db;
    border-radius:6px;font-size:14px;background:#fff;color:#111}
  .login-wrap .login-btn{width:100%;padding:10px;background:${P};color:#fff;border:none;
    border-radius:6px;font-size:14px;cursor:pointer;font-weight:500;margin-top:4px}
  .err{color:#B91C1C;font-size:12px;margin-top:6px}

  .info-box{background:${PL};color:${PD};padding:10px 14px;border-radius:8px;
    font-size:12px;margin-bottom:12px;border-left:3px solid ${P}}
  .success-wrap{text-align:center;padding:40px 20px}

  .loading{text-align:center;padding:40px;color:#888;font-size:13px}
  select option{background:#fff;color:#111}
`;

// ─── MAIN APP COMPONENT ───────────────────────────────────────────────────────

function App() {
  const [tab, setTab]                     = useState('predict');
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminState, setAdminState]       = useState({ actual_scores:{}, ko_winners:{}, bonus_actual:{} });
  const [submissions, setSubmissions]     = useState([]);
  const [loadingData, setLoadingData]     = useState(true);

  // Load initial data & subscribe to realtime
  useEffect(() => {
    async function load() {
      const [{ data: adm }, { data: subs }] = await Promise.all([
        supabase.from('admin_state').select('*').eq('id', 1).single(),
        supabase.from('submissions').select('*').order('created_at', { ascending: true }),
      ]);
      if (adm) setAdminState(adm);
      if (subs) setSubmissions(subs);
      setLoadingData(false);
    }
    load();

    // Realtime subscriptions
    const ch1 = supabase.channel('admin_rt')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'admin_state' },
        p => setAdminState(p.new))
      .subscribe();

    const ch2 = supabase.channel('subs_rt')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'submissions' },
        p => setSubmissions(prev => [...prev, p.new]))
      .subscribe();

    return () => { ch1.unsubscribe(); ch2.unsubscribe(); };
  }, []);

  const actualScores = adminState.actual_scores || {};
  const actualKoW    = adminState.ko_winners    || {};
  const bonusActual  = adminState.bonus_actual  || {};

  const qualifiers = getQualifiers(actualScores);

  if (loadingData) return <div className="loading">Loading...</div>;

  return (
    <div className="app">
      <style>{css}</style>

      <div className="topbar">
        <h1>⚽ FIFA World Cup 2026 · Predictor</h1>
        <nav className="nav">
          {[['predict','My Predictions'],['leaderboard','Leaderboard'],['standings','Standings'],['admin','Admin']].map(([k,l]) => (
            <button key={k} className={`nav-btn${tab===k?' active':''}`} onClick={() => setTab(k)}>{l}</button>
          ))}
        </nav>
      </div>

      {tab === 'predict'     && <PredictTab qualifiers={qualifiers} actualScores={actualScores} onSubmit={sub => setSubmissions(p => [...p, sub])} />}
      {tab === 'leaderboard' && <LeaderboardTab submissions={submissions} actualScores={actualScores} actualKoW={actualKoW} bonusActual={bonusActual} />}
      {tab === 'standings'   && <StandingsTab qualifiers={qualifiers} actualScores={actualScores} />}
      {tab === 'admin'       && <AdminTab adminUnlocked={adminUnlocked} setAdminUnlocked={setAdminUnlocked}
                                  adminState={adminState} setAdminState={setAdminState}
                                  submissions={submissions} qualifiers={qualifiers} />}
    </div>
  );
}

// ─── PREDICT TAB ─────────────────────────────────────────────────────────────

function PredictTab({ qualifiers, actualScores, onSubmit }) {
  const [step, setStep]       = useState('grp'); // grp | ko | bonus | done
  const [first, setFirst]     = useState('');
  const [last, setLast]       = useState('');
  const [team, setTeam]       = useState('');
  const [gScores, setGScores] = useState({});
  const [koW, setKoW]         = useState({});
  const [bonus, setBonus]     = useState({ scorer:'', redcard:'', penalty:'', header:'' });
  const [saving, setSaving]   = useState(false);
  const [err, setErr]         = useState('');

  // Re-compute KO teams whenever group scores change
  const predQ = getQualifiers(gScores);

  // Cascade KO winner selections when teams change
  function resolveT(src) { return resolveKOTeam(src, predQ, koW); }

  function setScore(n, side, val) {
    setGScores(prev => ({ ...prev, [n]: { ...prev[n], [side]: val } }));
  }

  function setKoWinner(code, val) {
    setKoW(prev => ({ ...prev, [code]: val }));
  }

  async function handleSubmit() {
    if (!first.trim() || !last.trim()) { setErr('Please enter your first and last name.'); return; }
    setSaving(true); setErr('');
    const sub = {
      first_name: first.trim(), last_name: last.trim(), team_name: team.trim(),
      group_scores: gScores, ko_winners: koW, bonus,
    };
    const { data, error } = await supabase.from('submissions').insert(sub).select().single();
    setSaving(false);
    if (error) { setErr('Error saving – please try again.'); return; }
    onSubmit(data);
    setStep('done');
  }

  if (step === 'done') return (
    <div className="card success-wrap">
      <div style={{fontSize:52,marginBottom:12}}>🎉</div>
      <div style={{fontSize:20,fontWeight:500,marginBottom:8}}>Predictions submitted!</div>
      <div style={{color:'#666',fontSize:13,marginBottom:20}}>Check the leaderboard as games are played.</div>
    </div>
  );

  return (
    <div>
      <div className="card">
        <div className="card-title">Participant details</div>
        <div className="field-row">
          <div className="field"><label>First name *</label><input value={first} onChange={e=>setFirst(e.target.value)} placeholder="Sophie"/></div>
          <div className="field"><label>Last name *</label><input value={last} onChange={e=>setLast(e.target.value)} placeholder="Dupont"/></div>
          <div className="field"><label>Team / company</label><input value={team} onChange={e=>setTeam(e.target.value)} placeholder="Accenture Belgium"/></div>
        </div>
      </div>

      <div className="section-nav">
        {[['grp','Group stage (72 matches)'],['ko','Knockout stage'],['bonus','Bonus questions']].map(([k,l])=>(
          <button key={k} className={`snav-btn${step===k?' active':''}`} onClick={()=>setStep(k)}>{l}</button>
        ))}
      </div>

      {step === 'grp' && (
        <div>
          <div className="info-box">Enter your predicted score for all 72 group matches. Correct result: 3 pts · Exact score: +2 pts.</div>
          <GroupMatchesList scores={gScores} setScore={setScore} />
        </div>
      )}

      {step === 'ko' && (
        <div>
          <div className="info-box">Select which team you think will win each knockout match. Teams auto-fill from your group stage predictions. Points: R32 +1 · R16 +2 · QF +3 · SF +4 · Final +4 · Correct winner +5.</div>
          <KOPredList predQ={predQ} koW={koW} setKoWinner={setKoWinner} />
        </div>
      )}

      {step === 'bonus' && (
        <div>
          <div className="card">
            <div className="card-title">Bonus questions</div>
            <div className="bonus-grid">
              <div className="field">
                <label>1. Top scorer (player name)</label>
                <input value={bonus.scorer} onChange={e=>setBonus(b=>({...b,scorer:e.target.value}))} placeholder="e.g. Romelu Lukaku"/>
                <div className="pts-hint">+1 pt per goal scored by your pick</div>
              </div>
              <div className="field">
                <label>2. First red card (country)</label>
                <SelectCountry value={bonus.redcard} onChange={v=>setBonus(b=>({...b,redcard:v}))}/>
                <div className="pts-hint">+5 pts if correct</div>
              </div>
              <div className="field">
                <label>3. First penalty (country)</label>
                <SelectCountry value={bonus.penalty} onChange={v=>setBonus(b=>({...b,penalty:v}))}/>
                <div className="pts-hint">+5 pts if correct</div>
              </div>
              <div className="field">
                <label>4. First Belgian header (player)</label>
                <select value={bonus.header} onChange={e=>setBonus(b=>({...b,header:e.target.value}))}>
                  <option value="">— select player —</option>
                  {BELGIUM_SQUAD.map(p=><option key={p} value={p}>{p}</option>)}
                </select>
                <div className="pts-hint">+5 pts if correct</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {err && <div className="err" style={{marginBottom:8}}>{err}</div>}
      <button className="submit-btn" disabled={saving} onClick={handleSubmit}>
        {saving ? 'Saving...' : 'Submit my predictions'}
      </button>
    </div>
  );
}

function GroupMatchesList({ scores, setScore }) {
  let curG = '';
  return (
    <div>
      {MATCHES.map(m => {
        const hdr = m.g !== curG ? (curG = m.g, true) : false;
        const s = scores[m.n] || {};
        const r = s.s1!==undefined && s.s2!==undefined && s.s1!=='' && s.s2!==''
          ? (+s.s1 > +s.s2 ? m.t1+' wins' : +s.s1 < +s.s2 ? m.t2+' wins' : 'Draw') : '';
        return (
          <div key={m.n}>
            {hdr && <div className="grp-hdr"><span>Group {m.g}</span><span style={{fontSize:11,opacity:.75}}>{GROUPS[m.g].join(' · ')}</span></div>}
            <div className="match-row">
              <div className="mnum">{m.n}</div>
              <div className="mdate">{m.d}</div>
              <div className="mgrp">{m.g}</div>
              <div className="tname r">{m.t1}</div>
              <input className="sinp" type="number" min="0" max="20" value={s.s1??''} onChange={e=>setScore(m.n,'s1',e.target.value)} placeholder="0"/>
              <input className="sinp" type="number" min="0" max="20" value={s.s2??''} onChange={e=>setScore(m.n,'s2',e.target.value)} placeholder="0"/>
              <div className="tname">{m.t2}</div>
              <div className="mresult match-result-col" style={{fontSize:10,color:'#888',textAlign:'right'}}>{r}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function KOPredList({ predQ, koW, setKoWinner }) {
  let curRnd = '';
  // Build KO winners progressively so later rounds see earlier selections
  const koWResolved = {};
  for (const m of KO_BRACKET) {
    const t1 = resolveKOTeam(m.t1src, predQ, koWResolved);
    const t2 = resolveKOTeam(m.t2src, predQ, koWResolved);
    const chosen = koW[m.code];
    if (chosen && (chosen === t1 || chosen === t2)) koWResolved[m.code] = chosen;
  }

  return (
    <div>
      {KO_BRACKET.map(m => {
        const hdr = m.rnd !== curRnd ? (curRnd = m.rnd, true) : false;
        const t1 = resolveKOTeam(m.t1src, predQ, koWResolved);
        const t2 = resolveKOTeam(m.t2src, predQ, koWResolved);
        const opts = [t1, t2].filter(t => t !== 'TBD');
        return (
          <div key={m.code}>
            {hdr && <div className="grp-hdr">{RND_LABEL[m.rnd]}</div>}
            <div className="ko-row">
              <div className="ko-code">{m.code}</div>
              <div className="ko-date">{m.d}</div>
              <div className="ko-team r">{t1}</div>
              <div className="vs">vs</div>
              <div className="ko-team">{t2}</div>
              <select className="ko-sel" value={koW[m.code]||''} onChange={e=>setKoWinner(m.code,e.target.value)}>
                <option value="">— winner —</option>
                {opts.map(t=><option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── LEADERBOARD TAB ─────────────────────────────────────────────────────────

function LeaderboardTab({ submissions, actualScores, actualKoW, bonusActual }) {
  const scored = submissions
    .map(s => ({ ...s, ...calcParticipantScore(s, actualScores, actualKoW, bonusActual) }))
    .sort((a, b) => b.total - a.total);

  const played = Object.keys(actualScores).length;
  const top    = scored[0]?.total ?? 0;

  return (
    <div className="card">
      <div className="lb-stats">
        <div className="stat-box"><div className="stat-val">{submissions.length}</div><div className="stat-lbl">Participants</div></div>
        <div className="stat-box"><div className="stat-val">{played}</div><div className="stat-lbl">Matches played</div></div>
        <div className="stat-box"><div className="stat-val">{top}</div><div className="stat-lbl">Top score</div></div>
        <div className="stat-box"><div className="stat-val">{72 - Math.min(played,72)}</div><div className="stat-lbl">Group matches left</div></div>
      </div>

      {!scored.length
        ? <div style={{textAlign:'center',padding:'24px',color:'#888'}}>No submissions yet. Be the first!</div>
        : <table className="lb-table">
            <thead><tr>
              <th style={{width:40}}>Rank</th>
              <th>Participant</th>
              <th style={{textAlign:'right'}}>Total</th>
              <th style={{textAlign:'right'}}>Group</th>
              <th style={{textAlign:'right'}}>Knockout</th>
              <th style={{textAlign:'right'}}>Bonus</th>
            </tr></thead>
            <tbody>
              {scored.map((s, i) => (
                <tr key={s.id}>
                  <td>{['🥇','🥈','🥉'][i] ?? i+1}</td>
                  <td>
                    <div style={{fontWeight:500}}>{s.first_name} {s.last_name}</div>
                    {s.team_name && <div style={{fontSize:11,color:'#888'}}>{s.team_name}</div>}
                  </td>
                  <td style={{textAlign:'right'}}><div className="pts-big">{s.total}</div></td>
                  <td style={{textAlign:'right',color:'#888'}}>{s.grpPts}</td>
                  <td style={{textAlign:'right',color:'#888'}}>{s.koPts}</td>
                  <td style={{textAlign:'right',color:'#888'}}>{s.bonusPts}</td>
                </tr>
              ))}
            </tbody>
          </table>
      }
    </div>
  );
}

// ─── STANDINGS TAB ────────────────────────────────────────────────────────────

function StandingsTab({ qualifiers, actualScores }) {
  const { winners, runners, thirds, best8 } = qualifiers;

  return (
    <div>
      {Object.keys(GROUPS).map(g => {
        const { ranks, stats } = rankGroup(g, actualScores);
        const sorted = [...GROUPS[g]].sort((a,b) => ranks[a]-ranks[b]);
        return (
          <div className="card" key={g} style={{marginBottom:10}}>
            <div className="card-title" style={{display:'flex',justifyContent:'space-between'}}>
              <span>Group {g}</span>
              <span>
                {winners[g] && <span className="badge bw" style={{marginLeft:4}}>{winners[g]} (1st)</span>}
                {runners[g] && <span className="badge bq" style={{marginLeft:4}}>{runners[g]} (2nd)</span>}
              </span>
            </div>
            <table className="std-table">
              <thead><tr><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GF</th><th>GA</th><th>GD</th><th>Pts</th></tr></thead>
              <tbody>
                {sorted.map(t => {
                  const s = stats[t];
                  const cls = ranks[t]===1?'row-1':ranks[t]===2?'row-2':ranks[t]===3?'row-3':'row-4';
                  return (
                    <tr key={t} className={cls}>
                      <td>{t}</td><td>{s.P}</td><td>{s.W}</td><td>{s.D}</td><td>{s.L}</td>
                      <td>{s.GF}</td><td>{s.GA}</td><td>{s.GD>=0?'+':''}{s.GD}</td>
                      <td style={{fontWeight:500}}>{s.Pts}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}

      <div className="card">
        <div className="card-title">Best 8 third-place teams</div>
        <table className="std-table">
          <thead><tr><th style={{textAlign:'left'}}>Rank</th><th>Group</th><th style={{textAlign:'left'}}>Team</th><th>Pts</th><th>GD</th><th>GF</th><th>Qualifies</th></tr></thead>
          <tbody>
            {thirds.map((t,i) => (
              <tr key={t.g} className={i<8?'row-2':'row-4'}>
                <td style={{textAlign:'left'}}>{i+1}</td><td>{t.g}</td><td style={{textAlign:'left',fontWeight:500}}>{t.t}</td>
                <td>{t.Pts}</td><td>{t.GD>=0?'+':''}{t.GD}</td><td>{t.GF}</td>
                <td><span className={`badge ${i<8?'bq':'be'}`}>{i<8?'✅ Yes':'❌ No'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── ADMIN TAB ────────────────────────────────────────────────────────────────

function AdminTab({ adminUnlocked, setAdminUnlocked, adminState, setAdminState, submissions, qualifiers }) {
  const [pw, setPw]     = useState('');
  const [pwErr, setPwErr] = useState('');
  const [adminStep, setAdminStep] = useState('grp');
  const [saving, setSaving] = useState({});
  const [selectedSub, setSelectedSub] = useState(null);

  if (!adminUnlocked) return (
    <div className="login-wrap">
      <div style={{fontSize:32,marginBottom:12}}>🔐</div>
      <div style={{fontWeight:500,marginBottom:16,fontSize:16}}>Admin panel</div>
      <input type="password" placeholder="Admin password" value={pw}
        onChange={e=>setPw(e.target.value)}
        onKeyDown={e=>e.key==='Enter'&&checkPw()}/>
      <button className="login-btn" onClick={checkPw}>Enter</button>
      {pwErr && <div className="err">{pwErr}</div>}
    </div>
  );

  function checkPw() {
    if (pw === ADMIN_PASSWORD) { setAdminUnlocked(true); setPwErr(''); }
    else setPwErr('Incorrect password.');
  }

  async function saveMatchScore(n, s1, s2) {
    if (s1==='' || s2==='') return;
    setSaving(p=>({...p,[n]:true}));
    const newScores = { ...(adminState.actual_scores||{}), [n]: { s1:+s1, s2:+s2 } };
    await supabase.from('admin_state').update({ actual_scores: newScores }).eq('id',1);
    setAdminState(p=>({...p, actual_scores: newScores}));
    setSaving(p=>({...p,[n]:false}));
  }

  async function saveKOWinner(code, winner) {
    if (!winner) return;
    const newKoW = { ...(adminState.ko_winners||{}), [code]: winner };
    await supabase.from('admin_state').update({ ko_winners: newKoW }).eq('id',1);
    setAdminState(p=>({...p, ko_winners: newKoW}));
  }

  async function saveBonus(ba) {
    await supabase.from('admin_state').update({ bonus_actual: ba }).eq('id',1);
    setAdminState(p=>({...p, bonus_actual: ba}));
    alert('Bonus results saved.');
  }

  return (
    <div>
      <div className="card">
        <div className="card-title">Enter actual match results</div>
        <div className="section-nav">
          {[['grp','Group matches'],['ko','Knockout matches'],['bonus','Bonus outcomes'],['subs','All submissions']].map(([k,l])=>(
            <button key={k} className={`snav-btn${adminStep===k?' active':''}`} onClick={()=>setAdminStep(k)}>{l}</button>
          ))}
        </div>

        {adminStep === 'grp' && (
          <AdminGroupMatches actualScores={adminState.actual_scores||{}} saveMatchScore={saveMatchScore} saving={saving}/>
        )}
        {adminStep === 'ko' && (
          <AdminKOMatches actualKoW={adminState.ko_winners||{}} actualScores={adminState.actual_scores||{}} saveKOWinner={saveKOWinner}/>
        )}
        {adminStep === 'bonus' && (
          <AdminBonus bonusActual={adminState.bonus_actual||{}} saveBonus={saveBonus}/>
        )}
        {adminStep === 'subs' && (
          <AdminSubmissions submissions={submissions} actualScores={adminState.actual_scores||{}}
            actualKoW={adminState.ko_winners||{}} bonusActual={adminState.bonus_actual||{}}
            selectedSub={selectedSub} setSelectedSub={setSelectedSub}/>
        )}
      </div>
    </div>
  );
}

function AdminGroupMatches({ actualScores, saveMatchScore, saving }) {
  const [vals, setVals] = useState({});
  let curG = '';
  return (
    <div>
      {MATCHES.map(m => {
        const hdr = m.g !== curG ? (curG = m.g, true) : false;
        const act = actualScores[m.n] || {};
        const s1 = vals[m.n]?.s1 ?? (act.s1!==undefined ? act.s1 : '');
        const s2 = vals[m.n]?.s2 ?? (act.s2!==undefined ? act.s2 : '');
        const saved = actualScores[m.n];
        return (
          <div key={m.n}>
            {hdr && <div className="grp-hdr">{`Group ${m.g}`}</div>}
            <div className="admin-match-row">
              <div style={{fontSize:11,color:'#777'}}>{m.n} · {m.d}</div>
              <div style={{textAlign:'right',fontWeight:500,fontSize:12}}>{m.t1}</div>
              <input className="a-inp" type="number" min="0" max="20"
                value={s1} onChange={e=>setVals(p=>({...p,[m.n]:{...p[m.n],s1:e.target.value}}))}
                placeholder="-"/>
              <input className="a-inp" type="number" min="0" max="20"
                value={s2} onChange={e=>setVals(p=>({...p,[m.n]:{...p[m.n],s2:e.target.value}}))}
                placeholder="-"/>
              <div style={{fontWeight:500,fontSize:12}}>{m.t2}</div>
              <div style={{display:'flex',gap:5,alignItems:'center'}}>
                {saved && <span className="saved-badge">✓</span>}
                <button className="save-btn" disabled={saving[m.n]}
                  onClick={()=>saveMatchScore(m.n, s1, s2)}>
                  {saving[m.n]?'...':'Save'}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AdminKOMatches({ actualKoW, actualScores, saveKOWinner }) {
  const q = getQualifiers(actualScores);
  let curRnd = '';
  return (
    <div>
      {KO_BRACKET.map(m => {
        const hdr = m.rnd !== curRnd ? (curRnd = m.rnd, true) : false;
        const t1 = resolveKOTeam(m.t1src, q, actualKoW);
        const t2 = resolveKOTeam(m.t2src, q, actualKoW);
        const actW = actualKoW[m.code];
        const opts = [t1,t2].filter(t=>t!=='TBD');
        return (
          <div key={m.code}>
            {hdr && <div className="grp-hdr">{RND_LABEL[m.rnd]}</div>}
            <div className="ko-row" style={{gridTemplateColumns:'52px 64px 1fr 20px 1fr 160px'}}>
              <div className="ko-code">{m.code}</div>
              <div className="ko-date">{m.d}</div>
              <div className="ko-team r">{t1}</div>
              <div className="vs">vs</div>
              <div className="ko-team">{t2}</div>
              <div style={{display:'flex',gap:5,alignItems:'center'}}>
                <select className="ko-sel" value={actW||''} onChange={e=>saveKOWinner(m.code,e.target.value)}>
                  <option value="">— winner —</option>
                  {opts.map(t=><option key={t} value={t}>{t}</option>)}
                </select>
                {actW && <span className="saved-badge">✓</span>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AdminBonus({ bonusActual, saveBonus }) {
  const [b, setB] = useState({ scorer:'', scorerGoals:0, redcard:'', penalty:'', header:'', ...bonusActual });
  useEffect(() => setB(p=>({...p,...bonusActual})), [bonusActual]);
  return (
    <div style={{paddingTop:8}}>
      <div className="bonus-grid">
        <div className="field"><label>Top scorer (actual player)</label><input value={b.scorer} onChange={e=>setB(p=>({...p,scorer:e.target.value}))} placeholder="Player name"/></div>
        <div className="field"><label>Goals scored by top scorer</label><input type="number" min="0" value={b.scorerGoals} onChange={e=>setB(p=>({...p,scorerGoals:+e.target.value}))}/></div>
        <div className="field"><label>First red card (country)</label><SelectCountry value={b.redcard} onChange={v=>setB(p=>({...p,redcard:v}))}/></div>
        <div className="field"><label>First penalty (country)</label><SelectCountry value={b.penalty} onChange={v=>setB(p=>({...p,penalty:v}))}/></div>
        <div className="field"><label>First Belgian header (player)</label>
          <select value={b.header} onChange={e=>setB(p=>({...p,header:e.target.value}))}>
            <option value="">— select —</option>
            {BELGIUM_SQUAD.map(p=><option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>
      <button className="save-btn" style={{marginTop:12,padding:'8px 20px',fontSize:13}} onClick={()=>saveBonus(b)}>Save bonus results</button>
    </div>
  );
}

function AdminSubmissions({ submissions, actualScores, actualKoW, bonusActual, selectedSub, setSelectedSub }) {
  if (!submissions.length) return <div style={{padding:'12px 0',color:'#888',fontSize:13}}>No submissions yet.</div>;

  const scored = submissions
    .map(s => ({ ...s, ...calcParticipantScore(s, actualScores, actualKoW, bonusActual) }))
    .sort((a,b) => b.total - a.total);

  if (selectedSub) {
    const s = selectedSub;
    return (
      <div>
        <button className="save-btn" style={{marginBottom:12}} onClick={()=>setSelectedSub(null)}>← Back</button>
        <div style={{fontWeight:500,marginBottom:8}}>{s.first_name} {s.last_name} — predictions</div>
        <div style={{marginBottom:8,fontSize:13,color:'#555'}}>Group scores:</div>
        {MATCHES.slice(0,10).map(m=>{
          const p=s.group_scores?.[m.n]; const a=actualScores[m.n];
          const correct = p&&a ? (scoreOutcome(+p.s1,+p.s2)===scoreOutcome(+a.s1,+a.s2)?'✅':'❌') : '';
          return <div key={m.n} style={{fontSize:12,display:'flex',gap:8,marginBottom:3,color:'#333'}}>
            <span style={{color:'#999',width:30}}>{m.n}</span>
            <span style={{width:120,textAlign:'right'}}>{m.t1}</span>
            <span style={{color:'#A100FF',fontWeight:500,width:40,textAlign:'center'}}>{p?`${p.s1}-${p.s2}`:'-'}</span>
            <span style={{width:120}}>{m.t2}</span>
            <span>{correct}</span>
          </div>;
        })}
        <div style={{color:'#888',fontSize:12,marginTop:4}}>...and {MATCHES.length-10} more matches</div>
      </div>
    );
  }

  return (
    <table className="lb-table" style={{width:'100%'}}>
      <thead><tr><th>#</th><th>Name</th><th>Team</th><th>Submitted</th><th style={{textAlign:'right'}}>Pts</th><th></th></tr></thead>
      <tbody>
        {scored.map((s,i)=>(
          <tr key={s.id}>
            <td>{i+1}</td>
            <td style={{fontWeight:500}}>{s.first_name} {s.last_name}</td>
            <td style={{color:'#888'}}>{s.team_name||'—'}</td>
            <td style={{fontSize:11,color:'#aaa'}}>{new Date(s.created_at).toLocaleDateString('en-GB')}</td>
            <td style={{textAlign:'right',fontWeight:500,color:'#A100FF'}}>{s.total}</td>
            <td><button className="save-btn" style={{fontSize:10,padding:'3px 8px'}} onClick={()=>setSelectedSub(s)}>View</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function SelectCountry({ value, onChange }) {
  return (
    <select value={value} onChange={e=>onChange(e.target.value)}>
      <option value="">— select country —</option>
      {ALL_COUNTRIES.map(c=><option key={c} value={c}>{c}</option>)}
    </select>
  );
}

// ─── BOOTSTRAP ───────────────────────────────────────────────────────────────

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
