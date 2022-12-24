import React, { Suspense, useEffect, useState } from 'react'
import { useRef } from 'react'

const TextForLazy = React.lazy(()=>import('../ForLazyComponent'))

const LazyTrending = () => {
  const [show, setShow] = useState(false)
  const trendingRef = useRef()
  let observer
  useEffect(() => {
    /*El la callback de IntersectionOnberser*/
    const onChange = (entries, observer) => {
      const el = entries[0]
      console.log(el)
      if(el.isIntersecting){ 
        setShow(true)
        observer.disconnect()
      }
    }
    Promise.resolve(
      typeof IntersectionObserver !== (undefined||'undefined')
      ? IntersectionObserver 
      : import('intersection-observer')
    ).then(()=>{
      /*Para Edge no tiene soporte nativo, istalar PolyFill: pequeña biblioteca que da funcionalidad que le falta a tu navegador */
        observer = new IntersectionObserver(onChange, {rootMargin: '100px'})
        observer.observe(trendingRef.current)

    })

    return ()=>observer&& observer.disconnect()
  }, [])
  
  return (
    <div ref={trendingRef}>
      <Suspense fallback={'cargando... Tambien sirve un componente'}>
        {show ? <TextForLazy/>: null}
      </Suspense>
    </div>
  )
}

export default LazyTrending