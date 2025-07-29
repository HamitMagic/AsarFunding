import React from "react"
import type { Item } from "../interfaces/item"
import styles from './styles.module.css';

export const ItemList = () => {
  const [items, setItems] = React.useState<Item[] | null>(null);

  const getData = async () => {
    const data = await fetch(import.meta.env.VITE_BACK+'goods');
    const res = await data.json();
    setItems(res)
  }
  
  React.useEffect(() => {
    getData()

  },[]);  

  return (
    <section className={styles.wrapper}>
      {items && items.map((el, index) => <div key={el.id} className={styles.itemData}>
        <span className={styles.elWrapper}>{index+1}</span>
        <span className={styles.elWrapper}>{el.name}</span>
        <div className={styles.descriptionWrapper}>
          {el.supplierList.map((supplier) => <div key={supplier.id} className={styles.description} >
            <span className={supplier.createdAt > new Date() ? styles.expired : styles.ok}>{supplier.measure}</span>
            <span className={supplier.createdAt > new Date() ? styles.expired : styles.ok}>{supplier.amount}</span>
            <span className={supplier.createdAt > new Date() ? styles.expired : styles.ok}>{supplier.price}</span>
            <span className={supplier.createdAt > new Date() ? styles.expired : styles.ok}>{supplier.name}</span>
          </div>)}
        </div>
      </div>)}
    </section>
  )
}