(ns subs)

(def reg-sub (.-reg_sub (require "./global")))

(reg-sub :count
  (fn [state]
    (.get state "count")))
